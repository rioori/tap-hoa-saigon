export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  description: string;
  brand?: string;
  origin?: string;
  expiry?: string;
  badge?: "sale" | "new" | "bestseller";
  badgeText?: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

export type Category =
  | "rau-cu"
  | "trai-cay"
  | "thit-ca"
  | "sua-trung"
  | "do-kho"
  | "nhu-yeu-pham";

export interface CategoryInfo {
  slug: Category;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
}

export type PaymentMethod = "cod" | "bank-transfer";

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
}
