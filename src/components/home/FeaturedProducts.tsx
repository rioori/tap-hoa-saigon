import Link from "next/link";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="px-4 mb-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-slate-800">Nhu yếu phẩm</h3>
        <Link href="/san-pham" className="text-primary text-sm font-medium">
          Xem thêm
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
