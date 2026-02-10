"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.showToast);

  const discountPercent =
    product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-md transition-shadow">
      {/* Image */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="relative aspect-square bg-slate-50 overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.badge === "sale" && product.badgeText && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {product.badgeText}
          </span>
        )}
        {product.badge === "new" && (
          <span className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">
            MỚI
          </span>
        )}
        {product.badge === "bestseller" && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            BEST SELLER
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-grow">
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight mb-1 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-slate-400 mb-2">{product.unit}</p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-primary font-bold text-base">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-slate-400 line-through text-[11px]">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
              showToast(product);
            }}
            className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-transform hover:bg-primary-dark"
            title="Thêm vào giỏ"
          >
            <span className="material-icons text-lg">add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
