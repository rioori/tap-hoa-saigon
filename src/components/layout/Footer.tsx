import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="Tạp Hóa Sài Gòn"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">Tạp Hóa Sài Gòn</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Đồng hành cùng bữa cơm gia đình Việt với thực phẩm tươi ngon mỗi
              ngày.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                { href: "/san-pham", label: "Sản phẩm" },
                { href: "/khuyen-mai", label: "Khuyến mãi" },
                { href: "/gioi-thieu", label: "Về chúng tôi" },
                { href: "/lien-he", label: "Liên hệ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Chính sách đổi trả</li>
              <li>Chính sách giao hàng</li>
              <li>Hướng dẫn mua hàng</li>
              <li>Câu hỏi thường gặp</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="material-icons text-base mt-0.5">place</span>
                <span>
                  123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. HCM
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-base">phone</span>
                <span>1900 1234</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-base">mail</span>
                <span>hotro@taphoasaigon.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; 2024 Tạp Hóa Sài Gòn Co., Ltd. All rights reserved.
          </p>
          <div className="flex gap-3">
            {["Facebook", "Instagram", "Zalo"].map((social) => (
              <div
                key={social}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold">{social[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
