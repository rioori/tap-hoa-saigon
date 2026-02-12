"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { formatPrice, CATEGORIES } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.showToast);
  const [qty, setQty] = useState(1);

  const categoryName =
    CATEGORIES.find((c) => c.slug === product.category)?.name || "";
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addItem(product, qty);
    showToast(product);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    router.push("/gio-hang");
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="px-4 py-3 text-sm text-slate-500 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-primary">
          Trang chủ
        </Link>
        <span className="material-icons text-xs">chevron_right</span>
        <Link href="/san-pham" className="hover:text-primary">
          Sản phẩm
        </Link>
        <span className="material-icons text-xs">chevron_right</span>
        <span className="text-slate-800 font-medium">{product.name}</span>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-8 px-4">
        {/* Product Image */}
        <div className="relative bg-white rounded-2xl overflow-hidden mb-6 md:mb-0 aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6"
            priority
          />
          {product.badge && product.badgeText && (
            <span
              className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${
                product.badge === "sale"
                  ? "bg-red-500"
                  : product.badge === "new"
                  ? "bg-primary"
                  : "bg-amber-500"
              }`}
            >
              {product.badgeText}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="bg-white rounded-2xl p-5 md:p-6 mb-4">
            <div className="flex justify-between items-center mb-2">
              {product.badge === "bestseller" && (
                <span className="px-2 py-1 bg-primary-light text-primary text-[10px] font-bold rounded">
                  BEST SELLER
                </span>
              )}
              {product.rating && (
                <span className="text-xs text-slate-500 flex items-center ml-auto">
                  <span className="material-icons text-yellow-400 text-sm mr-1">
                    star
                  </span>
                  {product.rating} ({product.reviewCount?.toLocaleString()}{" "}
                  đánh giá)
                </span>
              )}
            </div>

            <h1 className="text-xl md:text-2xl font-bold mb-2 text-primary-dark">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-primary-dark">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-red-600">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Quantity & Stock */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <span className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider font-bold block">
                  SỐ LƯỢNG
                </span>
                <div className="flex items-center bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 text-primary hover:bg-slate-50"
                  >
                    <span className="material-icons text-sm">remove</span>
                  </button>
                  <span className="px-4 py-1.5 font-bold text-sm min-w-[40px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1.5 text-primary hover:bg-slate-50"
                  >
                    <span className="material-icons text-sm">add</span>
                  </button>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 mb-1 block font-bold uppercase tracking-wider">
                  Tình trạng
                </span>
                <span
                  className={`text-sm font-bold ${
                    product.inStock ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.inStock ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>
            </div>
          </div>

          {/* Detail Info */}
          <div className="bg-white rounded-2xl p-5 md:p-6 mb-4">
            <h3 className="text-base font-bold mb-4 border-l-4 border-primary pl-3">
              Thông tin chi tiết
            </h3>
            <div className="space-y-3">
              {product.brand && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-sm text-slate-500">Thương hiệu</span>
                  <span className="text-sm font-semibold">{product.brand}</span>
                </div>
              )}
              {product.origin && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-sm text-slate-500">Xuất xứ</span>
                  <span className="text-sm font-semibold">{product.origin}</span>
                </div>
              )}
              {product.expiry && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-sm text-slate-500">Hạn sử dụng</span>
                  <span className="text-sm font-semibold">{product.expiry}</span>
                </div>
              )}
              {categoryName && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-sm text-slate-500">Danh mục</span>
                  <span className="text-sm font-semibold">{categoryName}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-sm text-slate-500 block mb-2">
                  Mô tả sản phẩm
                </span>
                <p className="text-sm leading-relaxed text-slate-600">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons - desktop */}
          <div className="hidden md:flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-xl font-bold py-3 hover:bg-primary-light transition-colors active:scale-95"
            >
              <span className="material-icons">shopping_cart</span>
              Thêm vào giỏ
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-[2] bg-primary text-white rounded-xl font-bold py-3 hover:bg-primary-dark transition-colors active:scale-95"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="px-4 py-8 border-t border-slate-100 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold">Sản phẩm liên quan</h3>
            <Link href="/san-pham" className="text-xs font-bold text-primary">
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {related.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Fixed bottom bar - mobile */}
      <div className="md:hidden fixed bottom-[60px] left-0 right-0 z-40 bg-white border-t border-slate-100 p-3">
        <div className="flex gap-3 max-w-md mx-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex flex-col items-center justify-center border border-primary text-primary rounded-xl font-bold py-2 active:scale-95 transition-all"
          >
            <span className="material-icons text-xl mb-0.5">shopping_cart</span>
            <span className="text-[9px] uppercase leading-none font-bold">
              THÊM VÀO GIỎ
            </span>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-[2] bg-primary text-white rounded-xl font-bold text-base active:scale-95 transition-all"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
