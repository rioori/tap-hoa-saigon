import HeroBanner from "@/components/home/HeroBanner";
import Categories from "@/components/home/Categories";
import FlashSale from "@/components/home/FlashSale";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { fetchFlashSaleProducts, fetchFeaturedProducts } from "@/lib/products";

export const revalidate = 60;

export default async function HomePage() {
  const [flashSaleProducts, featuredProducts] = await Promise.all([
    fetchFlashSaleProducts(),
    fetchFeaturedProducts(),
  ]);

  return (
    <>
      <HeroBanner />
      <Categories />
      <FlashSale products={flashSaleProducts} />
      <FeaturedProducts products={featuredProducts} />
    </>
  );
}
