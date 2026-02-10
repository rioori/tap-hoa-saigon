"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const getItemCount = useCartStore((s) => s.getItemCount);

  useEffect(() => setMounted(true), []);
  const count = mounted ? getItemCount() : 0;

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-inner">
            <Image
              src="/logo.jpg"
              alt="Tạp Hóa Sài Gòn"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-lg leading-none">
              Tạp Hóa Sài Gòn
            </h1>
            <p className="text-white/70 text-[11px] mt-0.5 flex items-center">
              <span className="material-icons text-[10px] mr-0.5">
                location_on
              </span>
              Quận 1, TP. HCM
            </p>
          </div>
        </Link>

        {/* Search bar - desktop */}
        <div className="hidden md:block flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm thực phẩm, đồ dùng..."
              className="w-full h-11 pl-11 pr-4 bg-white/95 border-none rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {[
            { href: "/san-pham", label: "Sản phẩm" },
            { href: "/khuyen-mai", label: "Khuyến mãi" },
            { href: "/gioi-thieu", label: "Giới thiệu" },
            { href: "/lien-he", label: "Liên hệ" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-icons">search</span>
          </button>

          {/* Cart */}
          <Link
            href="/gio-hang"
            className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-icons text-2xl">shopping_cart</span>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-primary">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search - expandable */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm thực phẩm, đồ dùng..."
              className="w-full h-11 pl-11 pr-4 bg-white/95 border-none rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              autoFocus
            />
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
