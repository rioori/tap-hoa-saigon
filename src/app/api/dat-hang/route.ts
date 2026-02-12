import { NextRequest, NextResponse } from "next/server";
import { generateOrderId } from "@/lib/utils";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, subtotal, shippingFee, total } =
      body;

    const orderId = generateOrderId();
    const orderDate = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    // Build item rows for email
    const itemRows = items
      .map(
        (item: { name: string; quantity: number; price: number; unit: string }) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px">${item.name}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;font-size:14px">${item.quantity}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-size:14px">${item.price.toLocaleString("vi-VN")}đ</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-size:14px;font-weight:bold">${(item.price * item.quantity).toLocaleString("vi-VN")}đ</td>
          </tr>`
      )
      .join("");

    const paymentLabel =
      paymentMethod === "cod"
        ? "Thanh toán khi nhận hàng (COD)"
        : "Chuyển khoản ngân hàng";

    const bankInfo =
      paymentMethod === "bank-transfer"
        ? `<div style="background:#f0f7ff;border-radius:8px;padding:16px;margin-top:16px">
            <p style="font-weight:bold;margin-bottom:8px;color:#135bec">Thông tin chuyển khoản:</p>
            <p>Ngân hàng: <strong>Vietcombank</strong></p>
            <p>Số tài khoản: <strong>1234567890</strong></p>
            <p>Chủ TK: <strong>PHAM DINH KHANG</strong></p>
            <p>Nội dung CK: <strong>${orderId} - ${customer.name}</strong></p>
          </div>`
        : "";

    const emailTemplate = `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
        <div style="background:#135bec;padding:24px;text-align:center;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:24px">Tạp Hóa Sài Gòn</h1>
          <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px">Xác nhận đơn hàng</p>
        </div>
        <div style="padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
          <p style="font-size:16px;color:#333">Xin chào <strong>${customer.name}</strong>,</p>
          <p style="color:#666;font-size:14px">Cảm ơn bạn đã đặt hàng tại Tạp Hóa Sài Gòn! Đơn hàng của bạn đã được tiếp nhận thành công.</p>

          <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0 0 8px"><strong>Mã đơn hàng:</strong> <span style="color:#135bec;font-size:18px;font-weight:bold">${orderId}</span></p>
            <p style="margin:0 0 4px"><strong>Ngày đặt:</strong> ${orderDate}</p>
            <p style="margin:0"><strong>Thanh toán:</strong> ${paymentLabel}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <thead>
              <tr style="background:#f8f9fa">
                <th style="padding:8px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#888">Sản phẩm</th>
                <th style="padding:8px 12px;text-align:center;font-size:12px;text-transform:uppercase;color:#888">SL</th>
                <th style="padding:8px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#888">Đơn giá</th>
                <th style="padding:8px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#888">Thành tiền</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <div style="text-align:right;padding:12px 0;border-top:2px solid #135bec">
            <p style="font-size:14px;color:#666;margin:4px 0">Tạm tính: ${subtotal.toLocaleString("vi-VN")}đ</p>
            <p style="font-size:14px;color:#666;margin:4px 0">Phí vận chuyển: ${shippingFee === 0 ? "Miễn phí" : shippingFee.toLocaleString("vi-VN") + "đ"}</p>
            <p style="font-size:20px;font-weight:bold;color:#135bec;margin:8px 0">Tổng: ${total.toLocaleString("vi-VN")}đ</p>
          </div>

          ${bankInfo}

          <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin-top:16px">
            <p style="font-weight:bold;margin-bottom:8px">Thông tin giao hàng:</p>
            <p style="margin:4px 0;font-size:14px">Người nhận: ${customer.name}</p>
            <p style="margin:4px 0;font-size:14px">SĐT: ${customer.phone}</p>
            <p style="margin:4px 0;font-size:14px">Địa chỉ: ${customer.address}</p>
            ${customer.note ? `<p style="margin:4px 0;font-size:14px">Ghi chú: ${customer.note}</p>` : ""}
          </div>

          <p style="color:#999;font-size:12px;text-align:center;margin-top:24px;padding-top:16px;border-top:1px solid #eee">
            Tạp Hóa Sài Gòn - Đồng hành cùng bữa cơm gia đình Việt<br/>
            Hotline: 1900 1234 | Email: hotro@taphoasaigon.vn
          </p>
        </div>
      </div>
    `;

    // Try to send emails via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail =
      process.env.ADMIN_EMAIL || "phamdinhkhang@gmail.com";
    const fromEmail =
      process.env.FROM_EMAIL || "onboarding@resend.dev";

    console.log("RESEND_API_KEY present:", !!resendApiKey);
    console.log("Sending emails to:", customer.email, "and admin:", adminEmail);

    if (resendApiKey && resendApiKey !== "re_xxxxxxxxxxxxx") {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        // Send to customer
        const customerResult = await resend.emails.send({
          from: `Tạp Hóa Sài Gòn <${fromEmail}>`,
          to: customer.email,
          subject: `Xác nhận đơn hàng ${orderId} - Tạp Hóa Sài Gòn`,
          html: emailTemplate,
        });
        console.log("Customer email result:", JSON.stringify(customerResult));

        // Send to admin
        const adminResult = await resend.emails.send({
          from: `Tạp Hóa Sài Gòn <${fromEmail}>`,
          to: adminEmail,
          subject: `[ĐƠN MỚI] ${orderId} - ${customer.name} - ${total.toLocaleString("vi-VN")}đ`,
          html: emailTemplate,
        });
        console.log("Admin email result:", JSON.stringify(adminResult));
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }
    } else {
      console.log("RESEND_API_KEY not configured. Skipping email.");
    }

    // Save order to Supabase
    try {
      const orderDetails = JSON.stringify({
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        payment_method: paymentMethod,
        subtotal,
        shipping_fee: shippingFee,
        items: items.map((i: { name: string; quantity: number; price: number; unit: string }) => ({
          name: i.name,
          qty: i.quantity,
          price: i.price,
          unit: i.unit,
        })),
        customer_note: customer.note || "",
      });

      const { error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          order_code: orderId,
          customer_name: customer.name,
          total_amount: total,
          status: "pending",
          note: orderDetails,
        });

      if (orderError) {
        console.error("Supabase order save error:", orderError);
      } else {
        console.log("Order saved to Supabase:", orderId);
      }
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Đặt hàng thành công!",
    });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra" },
      { status: 500 }
    );
  }
}
