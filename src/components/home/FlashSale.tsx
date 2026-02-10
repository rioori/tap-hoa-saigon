"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getFlashSaleProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export default function FlashSale() {
  const products = getFlashSaleProducts();
  const addItem = useCartStore((s) => s.addItem);
  const [time, setTime] = useState({ h: 1, m: 45, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 mb-8 max-w-7xl mx-auto">
      <div className="bg-slate-900 rounded-2xl p-4 md:p-6 overflow-hidden relative">
        <div className="flex items-center justify-between relative z-10 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-icons text-yellow-400">bolt</span>
            <h3 className="font-bold text-lg text-white italic">GIỜ VÀNG</h3>
            <div className="flex gap-1 ml-2">
              {[
                String(time.h).padStart(2, "0"),
                String(time.m).padStart(2, "0"),
                String(time.s).padStart(2, "0"),
              ].map((t, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-white text-xs">:</span>}
                  <span className="bg-white/10 text-white px-1.5 py-0.5 rounded text-xs font-mono">
                    {t}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 relative z-10">
          {products.slice(0, 4).map((product) => (
            <button
              key={product.id}
              className="bg-white rounded-xl p-2 flex items-center gap-2 cursor-pointer hover:shadow-md transition-shadow text-left"
              onClick={() => addItem(product)}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] md:text-xs font-bold text-slate-800 truncate">
                  {product.name}
                </p>
                <p className="text-primary text-xs font-bold">
                  {formatPrice(product.price)}{" "}
                  {product.originalPrice && (
                    <span className="text-[8px] text-slate-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        <div className="absolute -left-8 -top-8 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl" />
      </div>
    </section>
  );
}
