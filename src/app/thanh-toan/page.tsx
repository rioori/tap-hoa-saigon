"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, calculateShippingFee } from "@/lib/utils";
import { PaymentMethod } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, getSubtotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && items.length === 0 && !orderPlaced) {
      router.push("/gio-hang");
    }
  }, [mounted, items.length, orderPlaced, router]);

  if (!mounted || (items.length === 0 && !orderPlaced)) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-400">
        Đang tải...
      </div>
    );
  }

  const subtotal = getSubtotal();
  const shippingFee = calculateShippingFee(subtotal);
  const total = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/dat-hang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            unit: i.product.unit,
            image: i.product.image,
          })),
          paymentMethod,
          subtotal,
          shippingFee,
          total,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrderPlaced(true);
        clearCart();
        router.push(
          `/dat-hang-thanh-cong?orderId=${data.orderId}&payment=${paymentMethod}`
        );
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Thanh toán</h1>

      <form onSubmit={handleSubmit}>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left - Customer Info + Payment */}
          <div className="lg:col-span-2 space-y-6 mb-6 lg:mb-0">
            {/* Customer Info */}
            <div className="bg-white rounded-xl p-5 border border-slate-100">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-icons text-primary">person</span>
                Thông tin nhận hàng
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Nhập họ tên"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="Nhập số điện thoại"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Địa chỉ giao hàng *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, TP"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Ghi chú
                  </label>
                  <textarea
                    value={form.note}
                    onChange={(e) => updateField("note", e.target.value)}
                    placeholder="Ghi chú cho đơn hàng (tùy chọn)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-5 border border-slate-100">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-icons text-primary">payment</span>
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary-light"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-primary"
                  />
                  <span className="material-icons text-primary">
                    local_shipping
                  </span>
                  <div>
                    <p className="font-semibold text-sm">
                      Thanh toán khi nhận hàng (COD)
                    </p>
                    <p className="text-xs text-slate-400">
                      Thanh toán bằng tiền mặt khi nhận được hàng
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === "bank-transfer"
                      ? "border-primary bg-primary-light"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank-transfer"
                    checked={paymentMethod === "bank-transfer"}
                    onChange={() => setPaymentMethod("bank-transfer")}
                    className="accent-primary"
                  />
                  <span className="material-icons text-primary">
                    account_balance
                  </span>
                  <div>
                    <p className="font-semibold text-sm">
                      Chuyển khoản ngân hàng
                    </p>
                    <p className="text-xs text-slate-400">
                      Chuyển khoản qua tài khoản ngân hàng
                    </p>
                  </div>
                </label>
              </div>

              {paymentMethod === "bank-transfer" && (
                <div className="mt-4 bg-slate-50 rounded-xl p-4 text-sm">
                  <p className="font-bold text-slate-700 mb-2">
                    Thông tin chuyển khoản:
                  </p>
                  <div className="space-y-1 text-slate-600">
                    <p>
                      Ngân hàng:{" "}
                      <span className="font-semibold">Vietcombank</span>
                    </p>
                    <p>
                      Số tài khoản:{" "}
                      <span className="font-semibold">1234567890</span>
                    </p>
                    <p>
                      Chủ TK:{" "}
                      <span className="font-semibold">
                        PHAM DINH KHANG
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Nội dung CK: [Mã đơn hàng] - [Họ tên]
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-5 border border-slate-100 sticky top-20">
              <h3 className="font-bold text-lg text-slate-800 mb-4">
                Đơn hàng ({items.length} sản phẩm)
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-50 overflow-hidden shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        x{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-slate-700 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tạm tính</span>
                  <span className="font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phí vận chuyển</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-green-600">Miễn phí</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-2 flex justify-between">
                  <span className="font-bold text-slate-800">Tổng cộng</span>
                  <span className="font-bold text-xl text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full bg-primary text-white py-3.5 rounded-xl font-bold text-center hover:bg-primary-dark transition-colors active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <span className="material-icons">lock</span>
                    Đặt hàng
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
