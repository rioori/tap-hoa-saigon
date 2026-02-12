import { supabaseAdmin } from "@/lib/supabase";
import { Product } from "@/types";
import { slugify } from "@/lib/utils";

interface SupabaseProduct {
  id: string;
  product_code: string | null;
  name: string;
  quantity: number | null;
  price: number;
  unit: string | null;
  promo_price: number | null;
  status: boolean | null;
  image: string | null;
  created_at: string;
  brand: string | null;
  shock_price: number | null;
  category: string | null;
  photo: string | null;
  is_flash_sale: boolean | null;
  old_price: number | null;
  description: string | null;
}

function mapToProduct(p: SupabaseProduct): Product {
  const hasPromo = p.promo_price && p.promo_price < p.price;
  const hasOldPrice = p.old_price && p.old_price > p.price;

  return {
    id: p.id,
    slug: slugify(p.name),
    name: p.name,
    category: (p.category as Product["category"]) || "nhu-yeu-pham",
    price: hasPromo ? p.promo_price! : p.price,
    originalPrice: hasPromo ? p.price : hasOldPrice ? p.old_price! : undefined,
    unit: p.unit || "Sản phẩm",
    image: p.photo || p.image || "/logo.jpg",
    description: p.description || p.name,
    brand: p.brand || undefined,
    inStock: p.status !== false,
    badge: hasPromo || hasOldPrice ? "sale" : p.is_flash_sale ? "sale" : undefined,
    badgeText:
      hasPromo || hasOldPrice
        ? `-${Math.round(((hasPromo ? p.price - p.promo_price! : p.old_price! - p.price) / (hasPromo ? p.price : p.old_price!)) * 100)}%`
        : undefined,
  };
}

let cachedProducts: Product[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 60_000; // 1 minute

export async function fetchAllProducts(): Promise<Product[]> {
  const now = Date.now();
  if (cachedProducts && now - cacheTime < CACHE_TTL) {
    return cachedProducts;
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch products error:", error);
    return cachedProducts || [];
  }

  cachedProducts = (data as SupabaseProduct[]).map(mapToProduct);
  cacheTime = now;
  return cachedProducts;
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await fetchAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function fetchFlashSaleProducts(): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products
    .filter((p) => p.badge === "sale" || p.originalPrice)
    .slice(0, 6);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.slice(0, 8);
}

export async function fetchRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
