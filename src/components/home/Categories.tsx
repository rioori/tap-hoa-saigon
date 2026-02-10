import Link from "next/link";
import Image from "next/image";

const CATEGORY_DATA = [
  {
    slug: "rau-cu",
    name: "Rau củ",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    slug: "trai-cay",
    name: "Trái cây",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&h=200&fit=crop",
    gradient: "from-orange-400 to-amber-500",
  },
  {
    slug: "thit-ca",
    name: "Thịt & Cá",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&h=200&fit=crop",
    gradient: "from-red-400 to-rose-500",
  },
  {
    slug: "sua-trung",
    name: "Sữa & Trứng",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    slug: "do-kho",
    name: "Đồ khô",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&h=200&fit=crop",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    slug: "nhu-yeu-pham",
    name: "Nhu yếu phẩm",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop",
    gradient: "from-blue-400 to-indigo-500",
  },
];

export default function Categories() {
  return (
    <section className="px-4 mb-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-lg text-slate-800">Danh mục</h3>
        <Link href="/san-pham" className="text-primary text-sm font-semibold">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
        {CATEGORY_DATA.map((cat) => (
          <Link
            key={cat.slug}
            href={`/san-pham?category=${cat.slug}`}
            className="group"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/3" />
              <div className="absolute bottom-2.5 left-0 right-0 text-center">
                <span className="text-white text-xs md:text-sm font-bold drop-shadow-lg">
                  {cat.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
