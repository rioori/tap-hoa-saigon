import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "phamdinhkhang@gmail.com";
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    if (resendApiKey && resendApiKey !== "re_xxxxxxxxxxxxx") {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: `Tạp Hóa Sài Gòn <${fromEmail}>`,
        to: adminEmail,
        subject: `[Liên hệ] ${name} - ${email}`,
        html: `
          <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#135bec;padding:20px;text-align:center;border-radius:8px 8px 0 0">
              <h2 style="color:#fff;margin:0">Tin nhắn mới từ website</h2>
            </div>
            <div style="padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
              <p><strong>Họ tên:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Lời nhắn:</strong></p>
              <div style="background:#f8f9fa;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</div>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Gửi tin nhắn thành công!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra" },
      { status: 500 }
    );
  }
}
