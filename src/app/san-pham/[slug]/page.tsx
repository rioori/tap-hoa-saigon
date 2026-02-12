import Link from "next/link";
import { fetchProductBySlug, fetchRelatedProducts } from "@/lib/products";
import ProductDetail from "./ProductDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="material-icons text-6xl text-slate-300 mb-4 block">
          error_outline
        </span>
        <p className="text-slate-500 mb-4">Sản phẩm không tồn tại</p>
        <Link href="/san-pham" className="text-primary font-medium">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  const related = await fetchRelatedProducts(product);

  return <ProductDetail product={product} related={related} />;
}
