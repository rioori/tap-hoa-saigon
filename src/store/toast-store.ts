"use client";

import { create } from "zustand";
import { Product } from "@/types";

interface ToastState {
  product: Product | null;
  visible: boolean;
  showToast: (product: Product) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  product: null,
  visible: false,
  showToast: (product) => {
    set({ product, visible: true });
  },
  hideToast: () => {
    set({ visible: false });
  },
}));
