"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", icon: "home", label: "Trang chủ" },
  { href: "/san-pham", icon: "grid_view", label: "Danh mục" },
  { href: "/gio-hang", icon: "shopping_cart", label: "Giỏ hàng" },
  { href: "/khuyen-mai", icon: "local_offer", label: "Khuyến mãi" },
  { href: "/lien-he", icon: "person", label: "Liên hệ" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const getItemCount = useCartStore((s) => s.getItemCount);

  useEffect(() => setMounted(true), []);
  const count = mounted ? getItemCount() : 0;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-2 pt-2 pb-[env(safe-area-inset-bottom,8px)] z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors relative ${
                isActive ? "text-primary" : "text-slate-400"
              }`}
            >
              <span className="material-icons text-[22px]">{item.icon}</span>
              <span
                className={`text-[10px] ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                {item.label}
              </span>
              {item.href === "/gio-hang" && count > 0 && (
                <span className="absolute -top-0.5 right-1 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
