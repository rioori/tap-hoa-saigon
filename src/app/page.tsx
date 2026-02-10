import HeroBanner from "@/components/home/HeroBanner";
import Categories from "@/components/home/Categories";
import FlashSale from "@/components/home/FlashSale";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <Categories />
      <FlashSale />
      <FeaturedProducts />
    </>
  );
}
