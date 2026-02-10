import Image from "next/image";
import Link from "next/link";

const STATS = [
  { number: "10,000+", label: "Khách hàng tin tưởng" },
  { number: "500+", label: "Sản phẩm đa dạng" },
  { number: "2h", label: "Giao hàng nhanh chóng" },
  { number: "99%", label: "Khách hàng hài lòng" },
];

const VALUES = [
  {
    icon: "verified",
    title: "Chất lượng hàng đầu",
    desc: "Sản phẩm được tuyển chọn kỹ lưỡng, có nguồn gốc xuất xứ rõ ràng và đạt chứng nhận VietGAP.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: "local_shipping",
    title: "Giao hàng thần tốc",
    desc: "Đội ngũ shipper năng động cam kết giao hàng tận cửa chỉ trong 2 giờ tại các quận nội thành.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: "savings",
    title: "Giá cả bình ổn",
    desc: "Luôn nỗ lực tối ưu quy trình để mang lại mức giá tốt nhất cho người tiêu dùng.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: "favorite",
    title: "Tận tâm phục vụ",
    desc: "Đội ngũ hỗ trợ 7 ngày trong tuần, sẵn sàng lắng nghe và giải đáp mọi thắc mắc.",
    color: "from-rose-500 to-pink-600",
  },
];

const JOURNEY = [
  {
    year: "2024",
    title: "Khởi đầu hành trình",
    desc: "Ra mắt Tạp Hóa Sài Gòn với sứ mệnh mang thực phẩm sạch đến tận nhà.",
  },
  {
    year: "2024",
    title: "Mở rộng danh mục",
    desc: "Từ 50 sản phẩm ban đầu, phát triển lên 500+ sản phẩm đa dạng.",
  },
  {
    year: "2025",
    title: "Giao hàng 2 giờ",
    desc: "Triển khai dịch vụ giao hàng siêu tốc trong 2 giờ tại TP.HCM.",
  },
  {
    year: "2025",
    title: "10,000 khách hàng",
    desc: "Cột mốc 10,000 khách hàng tin tưởng và đồng hành.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero - Full width with parallax effect */}
      <section className="relative h-[420px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=700&fit=crop"
          alt="Tạp Hóa Sài Gòn"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
              <span className="material-icons text-sm">storefront</span>
              Since 2024
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4 max-w-lg">
              Đồng hành cùng
              <br />
              <span className="text-yellow-300">bữa ăn Việt</span>
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-md leading-relaxed">
              Tạp Hóa Sài Gòn - Nơi kết nối nông trại Việt với bàn ăn
              gia đình bạn, mỗi ngày.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm text-slate-500 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
          <div className="mb-8 md:mb-0">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
              Sứ mệnh
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-5 leading-tight">
              Mang thực phẩm sạch đến
              <span className="text-primary"> mọi gia đình</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Tại{" "}
              <span className="font-semibold text-primary">
                Tạp Hóa Sài Gòn
              </span>
              , chúng tôi tin rằng mỗi gia đình đều xứng đáng được tiếp cận với
              nguồn thực phẩm sạch, an toàn và tươi ngon nhất mỗi ngày.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Chúng tôi không chỉ bán hàng — chúng tôi kết nối những nông trại
              địa phương uy tín nhất với bàn ăn của người dân Sài Gòn, đảm bảo
              tiêu chuẩn khắt khe về vệ sinh an toàn thực phẩm.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["🥬", "🥕", "🍎", "🥩"].map((emoji, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-lg"
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-bold text-slate-700">500+</span> sản phẩm
                tươi ngon
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&h=450&fit=crop"
                alt="Fresh produce"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-2 md:-left-6 bg-white rounded-xl shadow-lg p-4 border border-slate-100 max-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-icons text-green-500 text-lg">
                  eco
                </span>
                <span className="text-sm font-bold text-slate-800">
                  VietGAP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                100% sản phẩm đạt tiêu chuẩn an toàn thực phẩm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Why Choose Us */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
              Giá trị cốt lõi
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Tại sao chọn chúng tôi?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {VALUES.map((item) => (
              <div
                key={item.icon}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`bg-gradient-to-br ${item.color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <span className="material-icons text-white">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
            Hành trình
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Câu chuyện phát triển
          </h2>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
          <div className="space-y-6 md:space-y-0">
            {JOURNEY.map((item, i) => (
              <div
                key={i}
                className={`md:grid md:grid-cols-2 md:gap-10 md:py-6 relative ${
                  i % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow z-10" />
                <div
                  className={`${
                    i % 2 === 0 ? "md:text-right md:pr-10" : "md:col-start-2 md:pl-10"
                  }`}
                >
                  <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-bold text-slate-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
              Hình ảnh
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Không gian Tạp Hóa Sài Gòn
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=400&fit=crop",
                alt: "Fresh market produce",
                span: "",
              },
              {
                src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=400&fit=crop",
                alt: "Grocery delivery",
                span: "",
              },
              {
                src: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=400&h=400&fit=crop",
                alt: "Organic vegetables",
                span: "hidden md:block",
              },
              {
                src: "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
                alt: "Fresh fruits",
                span: "",
              },
              {
                src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=400&fit=crop",
                alt: "Kitchen cooking",
                span: "",
              },
              {
                src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=400&fit=crop",
                alt: "Healthy food spread",
                span: "hidden md:block",
              },
            ].map((img) => (
              <div
                key={img.src}
                className={`aspect-square rounded-2xl overflow-hidden group ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-primary-dark via-primary to-blue-500 py-16 md:py-20">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <span className="material-icons text-white/30 text-6xl mb-4 block">
              format_quote
            </span>
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-3 italic">
              &ldquo;Cảm ơn quý khách đã tin tưởng và đồng hành cùng sự phát
              triển của Tạp Hóa Sài Gòn. Chúng tôi cam kết mang đến trải
              nghiệm mua sắm tốt nhất cho gia đình bạn.&rdquo;
            </p>
            <p className="text-white/60 text-sm mb-8">
              — Đội ngũ Tạp Hóa Sài Gòn
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 bg-white text-primary px-7 py-3.5 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Khám phá cửa hàng
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 bg-white/15 text-white px-7 py-3.5 rounded-full font-bold border border-white/30 hover:bg-white/25 transition-colors"
              >
                Liên hệ với chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
