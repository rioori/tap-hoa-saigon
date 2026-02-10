import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import CartToast from "@/components/layout/CartToast";

export const metadata: Metadata = {
  title: "Tạp Hóa Sài Gòn - Thực phẩm tươi sống giao tận nhà",
  description:
    "Tạp Hóa Sài Gòn - Đồng hành cùng bữa cơm gia đình Việt. Thực phẩm tươi sống, rau củ quả, nhu yếu phẩm giao nhanh trong 2h tại TP.HCM.",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased text-slate-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <Footer />
        <MobileNav />
        <CartToast />
      </body>
    </html>
  );
}
