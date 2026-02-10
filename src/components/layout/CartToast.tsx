"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToastStore } from "@/store/toast-store";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartToast() {
  const { product, visible, hideToast } = useToastStore();
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (visible) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(hideToast, 3500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, hideToast]);

  if (!product) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-[100] w-[340px] max-w-[calc(100vw-2rem)] transition-all duration-300 ${
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-green-50 px-4 py-2.5 flex items-center gap-2 border-b border-green-100">
          <span className="material-icons text-green-600 text-lg">
            check_circle
          </span>
          <span className="text-sm font-semibold text-green-700">
            Đã thêm vào giỏ hàng
          </span>
          <button
            onClick={hideToast}
            className="ml-auto text-slate-400 hover:text-slate-600"
          >
            <span className="material-icons text-lg">close</span>
          </button>
        </div>

        {/* Product */}
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {product.name}
            </p>
            <p className="text-xs text-slate-400">{product.unit}</p>
            <p className="text-sm font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        {/* Cart summary + CTA */}
        <div className="px-4 pb-3 flex items-center gap-2">
          <div className="flex-1 text-xs text-slate-500">
            <span className="font-bold text-slate-700">{getItemCount()}</span>{" "}
            sản phẩm ·{" "}
            <span className="font-bold text-primary">
              {formatPrice(getSubtotal())}
            </span>
          </div>
          <Link
            href="/gio-hang"
            onClick={hideToast}
            className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors active:scale-95"
          >
            Xem giỏ hàng
          </Link>
        </div>
      </div>
    </div>
  );
}
