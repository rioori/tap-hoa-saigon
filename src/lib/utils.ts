export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateOrderId(): string {
  const now = new Date();
  const dateStr =
    now.getFullYear().toString().slice(2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `THS-${dateStr}-${rand}`;
}

export function calculateShippingFee(subtotal: number): number {
  return subtotal >= 200000 ? 0 : 25000;
}

export const CATEGORIES: {
  slug: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}[] = [
  { slug: "rau-cu", name: "Rau củ", icon: "eco", color: "text-green-600", bgColor: "bg-green-100" },
  { slug: "trai-cay", name: "Trái cây", icon: "nutrition", color: "text-orange-600", bgColor: "bg-orange-100" },
  { slug: "thit-ca", name: "Thịt & Cá", icon: "restaurant", color: "text-red-600", bgColor: "bg-red-100" },
  { slug: "sua-trung", name: "Sữa & Trứng", icon: "egg_alt", color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { slug: "do-kho", name: "Đồ khô", icon: "bakery_dining", color: "text-amber-700", bgColor: "bg-amber-100" },
  { slug: "nhu-yeu-pham", name: "Nhu yếu phẩm", icon: "clean_hands", color: "text-blue-600", bgColor: "bg-blue-100" },
];
