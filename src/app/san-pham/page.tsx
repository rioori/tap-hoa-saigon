"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORIES } from "@/lib/utils";

function ProductListingInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc")
      result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name")
      result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [selectedCategory, sortBy, searchQuery, products]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
              <div className="aspect-square bg-slate-100" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-5 bg-slate-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {searchQuery && (
        <div className="bg-primary-light rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-700">
            Kết quả tìm kiếm cho &ldquo;
            <span className="font-bold text-primary">{searchQuery}</span>
            &rdquo; ({filtered.length} sản phẩm)
          </p>
          <a href="/san-pham" className="text-xs font-bold text-primary hover:underline">
            Xóa bộ lọc
          </a>
        </div>
      )}

      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-4 pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === "all"
              ? "bg-primary text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Tất cả
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === cat.slug
                ? "bg-primary text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-3 border border-slate-100">
        <span className="text-sm text-slate-500">
          <span className="font-bold text-slate-800">{filtered.length}</span> sản phẩm
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border-none bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
        >
          <option value="default">Mặc định</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
          <option value="name">Tên A-Z</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <span className="material-icons text-6xl text-slate-300 mb-4 block">
            inventory_2
          </span>
          <p className="text-slate-500">Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center py-16 text-slate-400">Đang tải...</div>
        </div>
      }
    >
      <ProductListingInner />
    </Suspense>
  );
}
