"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, calculateShippingFee } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-400">
        Đang tải giỏ hàng...
      </div>
    );
  }

  const subtotal = getSubtotal();
  const shippingFee = calculateShippingFee(subtotal);
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <span className="material-icons text-7xl text-slate-200 mb-4 block">
          shopping_cart
        </span>
        <h2 className="text-xl font-bold text-slate-700 mb-2">
          Giỏ hàng trống
        </h2>
        <p className="text-slate-400 mb-6">
          Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
        >
          <span className="material-icons">storefront</span>
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Giỏ hàng ({items.length} sản phẩm)
      </h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3 mb-6 lg:mb-0">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-xl p-4 border border-slate-100 flex gap-4"
            >
              <Link
                href={`/san-pham/${item.product.slug}`}
                className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-slate-50 overflow-hidden shrink-0"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/san-pham/${item.product.slug}`}
                  className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors line-clamp-2"
                >
                  {item.product.name}
                </Link>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {item.product.unit}
                </p>
                <p className="text-primary font-bold text-sm mt-1">
                  {formatPrice(item.product.price)}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="px-2.5 py-1 text-slate-500 hover:bg-slate-50"
                    >
                      <span className="material-icons text-sm">remove</span>
                    </button>
                    <span className="px-3 py-1 text-sm font-bold min-w-[32px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-2.5 py-1 text-slate-500 hover:bg-slate-50"
                    >
                      <span className="material-icons text-sm">add</span>
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  >
                    <span className="material-icons text-xl">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-5 border border-slate-100 sticky top-20">
            <h3 className="font-bold text-lg text-slate-800 mb-4">
              Tóm tắt đơn hàng
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Tạm tính</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phí vận chuyển</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-green-600">Miễn phí</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-[11px] text-slate-400 bg-slate-50 rounded-lg p-2">
                  Miễn phí vận chuyển cho đơn hàng từ{" "}
                  <span className="font-bold text-primary">200.000đ</span>
                </p>
              )}
              <div className="border-t border-slate-100 pt-3 flex justify-between">
                <span className="font-bold text-slate-800">Tổng cộng</span>
                <span className="font-bold text-xl text-primary">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Link
              href="/thanh-toan"
              className="mt-5 w-full bg-primary text-white py-3.5 rounded-xl font-bold text-center block hover:bg-primary-dark transition-colors active:scale-[0.98]"
            >
              Tiến hành thanh toán
            </Link>

            <Link
              href="/san-pham"
              className="mt-3 w-full text-primary py-2 rounded-xl font-medium text-sm text-center block hover:bg-primary-light transition-colors"
            >
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
