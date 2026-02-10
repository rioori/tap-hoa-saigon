"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lien-he", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        alert(data.message || "Có lỗi xảy ra");
      }
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Map Section */}
      <section className="w-full h-64 bg-slate-200 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=400&fit=crop"
          alt="Map"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white p-2 rounded-xl shadow-xl flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-primary px-2 py-1">
              Tạp Hóa Sài Gòn
            </span>
          </div>
          <span className="material-icons text-primary text-4xl drop-shadow-lg">
            location_on
          </span>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="p-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <a
            href="tel:19001234"
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-3">
              <span className="material-icons text-primary">phone</span>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Hotline 24/7
            </span>
            <span className="text-sm font-bold text-slate-800">1900 1234</span>
          </a>
          <a
            href="mailto:hotro@taphoasaigon.vn"
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-3">
              <span className="material-icons text-primary">mail</span>
            </div>
            <span className="text-xs font-medium text-slate-500">Email</span>
            <span className="text-sm font-bold text-slate-800">
              hotro@taphoasaigon.vn
            </span>
          </a>
        </div>
      </section>

      {/* Address */}
      <section className="px-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-100 max-w-lg mx-auto">
          <div className="flex items-start gap-4">
            <span className="material-icons text-primary mt-1">place</span>
            <div>
              <h3 className="font-bold text-slate-800 mb-1">Trụ sở chính</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh
              </p>
              <p className="text-xs text-slate-400 mt-2 italic">
                Mở cửa: 07:00 - 22:00 hàng ngày
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-6 mb-12 max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Gửi lời nhắn cho chúng tôi
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng 24 giờ làm việc.
          </p>
        </div>
        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-green-500 text-3xl">check_circle</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Đã gửi thành công!</h3>
            <p className="text-sm text-slate-500 mb-4">Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
            <button
              onClick={() => setSent(false)}
              className="text-primary font-medium text-sm hover:underline"
            >
              Gửi tin nhắn khác
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1.5"
                htmlFor="contact-name"
              >
                Họ và tên
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                id="contact-name"
                placeholder="Nhập tên của bạn"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1.5"
                htmlFor="contact-email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                id="contact-email"
                placeholder="email@vi-du.vn"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1.5"
                htmlFor="contact-message"
              >
                Lời nhắn
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm resize-none"
                id="contact-message"
                placeholder="Bạn cần hỗ trợ điều gì?"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
            </div>
            <button
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  <span className="material-icons text-xl">send</span>
                  <span>Gửi tin nhắn ngay</span>
                </>
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
