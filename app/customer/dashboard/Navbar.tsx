"use client";
import { cinzel, greatVibes } from "@/components/common/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const navLinkClass = (path: string) =>
    `text-xs sm:text-sm font-bold transition-all px-1
     ${isActive(path)
        ? "text-[#FF7A00]"
        : "text-gray-600 hover:text-[#FF7A00]"
     }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur
                    border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">

          {/* ================= Logo ================= */}
          <Link href="/" className="select-none shrink-0">
            <div className="flex flex-col items-center leading-tight text-center">
              <h1
                className={`${cinzel.className} text-xl sm:text-2xl tracking-widest`}
              >
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  A
                </span>
                <span className="text-gray-950">nnapurna</span>
              </h1>

              <p
                className={`${greatVibes.className}
                            text-lg sm:text-xl
                            bg-gradient-to-r from-orange-500 to-red-500
                            bg-clip-text text-transparent`}
              >
                Delight
              </p>
            </div>
          </Link>

          {/* ================= Nav Links ================= */}
          <div
            className="
              flex-1 flex items-center justify-center
              gap-5 sm:gap-6
              overflow-x-auto whitespace-nowrap
              scrollbar-hide
            "
          >
            <Link href="/" className={navLinkClass("/")}>
              Dashboard
            </Link>

            <Link
              href="/customer/dashboard/menu"
              className={navLinkClass("/customer/dashboard/menu")}
            >
              Menu
            </Link>

            <Link
              href="/customer/dashboard/plan"
              className={navLinkClass("/customer/dashboard/plan")}
            >
              Plan
            </Link>

            <Link
              href="/customer/dashboard/payments"
              className={navLinkClass("/customer/dashboard/payments")}
            >
              Payments
            </Link>
          </div>

          {/* ================= Profile ================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:block text-right leading-tight">
              <p className="text-xs font-extrabold text-gray-800">
                Bhupendra
              </p>
              <p className="text-[10px] font-bold text-green-600">
                Wallet ₹450
              </p>
            </div>

            <div className="w-9 h-9 rounded-full
                            bg-orange-100 text-orange-600
                            flex items-center justify-center
                            font-bold shadow-inner cursor-pointer">
              👤
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
