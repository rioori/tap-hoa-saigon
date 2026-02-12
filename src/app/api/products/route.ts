import { NextResponse } from "next/server";
import { fetchAllProducts } from "@/lib/products";

export async function GET() {
  const products = await fetchAllProducts();
  return NextResponse.json(products);
}
