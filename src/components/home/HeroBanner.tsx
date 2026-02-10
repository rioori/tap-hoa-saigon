"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=600&fit=crop",
    tag: "Ưu đãi tuần này",
    title: "Thực phẩm tươi sống\nGiao hàng trong 2h",
    cta: "Mua ngay",
    href: "/san-pham",
  },
  {
    image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=1400&h=600&fit=crop",
    tag: "Rau củ hữu cơ",
    title: "Rau sạch Đà Lạt\nTươi ngon mỗi ngày",
    cta: "Khám phá",
    href: "/san-pham?category=rau-cu",
  },
  {
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1400&h=600&fit=crop",
    tag: "Flash Sale",
    title: "Giảm đến 45%\nCho đơn từ 200K",
    cta: "Xem ngay",
    href: "/khuyen-mai",
  },
  {
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1400&h=600&fit=crop",
    tag: "Trái cây nhập khẩu",
    title: "Trái cây tươi mát\nĐa dạng chọn lựa",
    cta: "Mua ngay",
    href: "/san-pham?category=trai-cay",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [current, isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="px-4 py-6 max-w-7xl mx-auto">
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden shadow-lg">
        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-600 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent flex flex-col justify-center px-6 md:px-12">
              <span className="bg-white text-primary text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full w-fit mb-2 uppercase tracking-wider">
                {slide.tag}
              </span>
              <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 md:mb-4 whitespace-pre-line">
                {slide.title}
              </h2>
              <Link
                href={slide.href}
                className="bg-white text-primary px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold w-fit shadow-sm hover:shadow-md active:scale-95 transition-all"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors"
        >
          <span className="material-icons text-lg md:text-xl">chevron_left</span>
        </button>
        <button
          onClick={() => goTo((current + 1) % SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors"
        >
          <span className="material-icons text-lg md:text-xl">chevron_right</span>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
