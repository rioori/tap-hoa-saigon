"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "---";
  const payment = searchParams.get("payment") || "cod";

  return (
    <div className="max-w-lg mx-auto px-4 py-12 text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="material-icons text-green-500 text-5xl">
          check_circle
        </span>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        Đặt hàng thành công!
      </h1>
      <p className="text-slate-500 mb-6">
        Cảm ơn bạn đã mua sắm tại Tạp Hóa Sài Gòn
      </p>

      {/* Order Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 mb-6 text-left">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
          <span className="text-sm text-slate-500">Mã đơn hàng</span>
          <span className="text-lg font-bold text-primary">{orderId}</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="material-icons text-primary text-xl">email</span>
            <p className="text-slate-600">
              Email xác nhận đã được gửi đến hộp thư của bạn
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-icons text-primary text-xl">
              local_shipping
            </span>
            <p className="text-slate-600">
              Đơn hàng sẽ được giao trong vòng 2-4 giờ
            </p>
          </div>
        </div>
      </div>

      {/* Bank Transfer Info */}
      {payment === "bank-transfer" && (
        <div className="bg-primary-light rounded-2xl p-5 mb-6 text-left">
          <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
            <span className="material-icons">account_balance</span>
            Thông tin chuyển khoản
          </h3>
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              Ngân hàng: <span className="font-bold">Vietcombank</span>
            </p>
            <p>
              Số tài khoản: <span className="font-bold">1234567890</span>
            </p>
            <p>
              Chủ TK: <span className="font-bold">PHAM DINH KHANG</span>
            </p>
            <p>
              Nội dung CK:{" "}
              <span className="font-bold text-primary">
                {orderId}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href="/san-pham"
          className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-center hover:bg-primary-dark transition-colors active:scale-[0.98]"
        >
          Tiếp tục mua sắm
        </Link>
        <Link
          href="/"
          className="w-full text-primary py-3 rounded-xl font-medium text-center hover:bg-primary-light transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-4 py-16 text-center text-slate-400">
          Đang tải...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
