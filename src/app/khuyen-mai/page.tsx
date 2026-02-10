"use client";

import { getFlashSaleProducts } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect } from "react";

export default function PromotionsPage() {
  const saleProducts = getFlashSaleProducts();
  const addItem = useCartStore((s) => s.addItem);
  const [time, setTime] = useState({ h: 2, m: 45, s: 12 });

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
    <div className="max-w-7xl mx-auto">
      {/* Coupon Banners */}
      <section className="mt-4 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Mã giảm giá độc quyền
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          <div className="flex-shrink-0 w-72 bg-white rounded-xl border-l-8 border-primary shadow-sm flex overflow-hidden">
            <div className="p-4 flex-grow">
              <p className="text-xs text-slate-500 font-medium">
                Đơn hàng từ 200k
              </p>
              <h3 className="font-bold text-lg text-primary">GIẢM 20.000đ</h3>
              <p className="text-[10px] mt-1 text-slate-400">
                HSD: 28.02.2026
              </p>
            </div>
            <div className="w-20 bg-primary-light flex flex-col items-center justify-center border-l border-dashed border-primary/30 px-2">
              <button className="bg-primary text-white text-[10px] font-bold py-1 px-3 rounded-full">
                LƯU
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 w-72 bg-white rounded-xl border-l-8 border-orange-500 shadow-sm flex overflow-hidden">
            <div className="p-4 flex-grow">
              <p className="text-xs text-slate-500 font-medium">
                Mọi đơn hàng
              </p>
              <h3 className="font-bold text-lg text-orange-600">FREE SHIP</h3>
              <p className="text-[10px] mt-1 text-slate-400">
                HSD: 28.02.2026
              </p>
            </div>
            <div className="w-20 bg-orange-50 flex flex-col items-center justify-center border-l border-dashed border-orange-500/30 px-2">
              <button className="bg-orange-500 text-white text-[10px] font-bold py-1 px-3 rounded-full">
                LƯU
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 w-72 bg-white rounded-xl border-l-8 border-green-500 shadow-sm flex overflow-hidden">
            <div className="p-4 flex-grow">
              <p className="text-xs text-slate-500 font-medium">
                Khách hàng mới
              </p>
              <h3 className="font-bold text-lg text-green-600">GIẢM 10%</h3>
              <p className="text-[10px] mt-1 text-slate-400">
                HSD: 28.02.2026
              </p>
            </div>
            <div className="w-20 bg-green-50 flex flex-col items-center justify-center border-l border-dashed border-green-500/30 px-2">
              <button className="bg-green-500 text-white text-[10px] font-bold py-1 px-3 rounded-full">
                LƯU
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="mt-6 bg-gradient-to-b from-primary/10 to-transparent py-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-icons text-yellow-500 text-2xl">
              bolt
            </span>
            <h2 className="text-xl font-extrabold text-primary italic tracking-tight uppercase">
              Flash Sale
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-600">
              Kết thúc sau
            </span>
            <div className="flex gap-1">
              {[
                String(time.h).padStart(2, "0"),
                String(time.m).padStart(2, "0"),
                String(time.s).padStart(2, "0"),
              ].map((t, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-slate-800 font-bold">:</span>
                  )}
                  <span className="bg-slate-800 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                    {t}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {saleProducts.slice(0, 4).map((product) => {
            const soldPercent = Math.floor(Math.random() * 60 + 20);
            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-40 bg-white rounded-xl shadow-sm overflow-hidden border border-primary/10"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.badgeText && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                      {product.badgeText}
                    </div>
                  )}
                </div>
                <div className="p-2 text-center">
                  <p className="text-[13px] font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  {product.originalPrice && (
                    <p className="text-[10px] text-slate-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                  <div className="mt-2 h-3 bg-slate-100 rounded-full relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
                      style={{ width: `${soldPercent}%` }}
                    />
                    <span className="absolute inset-0 text-[8px] text-white flex items-center justify-center font-bold">
                      Đã bán {soldPercent}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sale Products Grid */}
      <section className="px-4 py-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Giá sốc hôm nay
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
