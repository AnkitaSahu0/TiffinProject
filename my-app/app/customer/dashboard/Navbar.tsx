


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cinzel, greatVibes } from "@/my-app/components/common/Navbar";

type UserType = {
  name: string;
  email: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<UserType | null>(null);

  /* ================= Avoid Hydration Error ================= */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  /* ================= Load Theme ================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    }
  }, []);

  /* ================= Toggle Theme ================= */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  };

  /* ================= Load User ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ================= Logout ================= */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    router.push("/login");
  };

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const navClass = (path: string) =>
    `px-3 py-2 text-sm font-bold transition ${
      isActive(path)
        ? "text-orange-600"
        : "text-gray-700 dark:text-gray-300 hover:text-orange-600"
    }`;

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-orange-100 dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* ================= Logo ================= */}
          <Link href="/" className="select-none">
            <div className="leading-tight">
              <h1 className={`${cinzel.className} text-xl tracking-widest`}>
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  A
                </span>
                <span className="text-gray-900 dark:text-white">
                  nnapurna
                </span>
              </h1>
              <p
                className={`${greatVibes.className}
                text-lg bg-gradient-to-r from-orange-500 to-red-500
                bg-clip-text text-transparent text-center`}
              >
                Delight
              </p>
            </div>
          </Link>

          {/* ================= Desktop Links ================= */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/customer/dashboard" className={navClass("/customer/dashboard")}>Dashboard</Link>
            <Link href="/customer/dashboard/menu" className={navClass("/customer/dashboard/menu")}>Menu</Link>
            <Link href="/customer/dashboard/plan" className={navClass("/customer/dashboard/plan")}>Plan</Link>
            <Link href="/customer/dashboard/payments" className={navClass("/customer/dashboard/payments")}>Payments</Link>
          </div>

          {/* ================= Right Controls ================= */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800
                         text-gray-700 dark:text-gray-200
                         hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Desktop User */}
            {user && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden text-gray-900 dark:text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      {open && (
        <div className="sm:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 transition-colors">
          <div className="flex flex-col px-4 py-4 space-y-3">

            {/* User Info */}
            {user && (
              <div className="border rounded-lg p-3 bg-orange-50 dark:bg-gray-800 dark:border-orange-500">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            )}

            <Link onClick={() => setOpen(false)} href="/customer/dashboard" className={navClass("/customer/dashboard")}>Dashboard</Link>
            <Link onClick={() => setOpen(false)} href="/customer/dashboard/menu" className={navClass("/customer/dashboard/menu")}>Menu</Link>
            <Link onClick={() => setOpen(false)} href="/customer/dashboard/plan" className={navClass("/customer/dashboard/plan")}>Plan</Link>
            <Link onClick={() => setOpen(false)} href="/customer/dashboard/payments" className={navClass("/customer/dashboard/payments")}>Payments</Link>

            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 text-red-600 border-black font-bold pt-2 border rounded-lg p-3 bg-orange-50 dark:bg-gray-800 dark:border-orange-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
