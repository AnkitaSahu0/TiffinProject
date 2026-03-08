/* eslint-disable react-hooks/set-state-in-effect */


"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Cinzel, Great_Vibes } from "next/font/google";
import { useRouter } from "next/navigation";

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

type UserType = {
  id: number;
  name: string;
  email: string;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Plans", href: "/#plans" },
    { name: "Contact", href: "/#contact" },
  ];

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-16 py-4">

        {/* LOGO */}
        <Link href="/" className="select-none">
          <div className="flex flex-col items-center text-center lg:ml-45">
            <h1 className={`${cinzel.className} text-2xl tracking-widest`}>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                A
              </span>
              <span className="text-gray-900">nnapurna</span>
            </h1>
            <p
              className={`${greatVibes.className} text-lg bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}
            >
              Delight
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 lg:mr-45">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-orange-600 transition"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <Link
              href="/register"
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
            >
              Sign Up
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 border px-3 py-2 rounded-md bg-orange-600 hover:bg-orange-400 transition"
              >
                <User size={18} />
                <span className="text-sm">{user.email}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 text-black mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <Link
                    href="/customer/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50"
                  >
                    <User size={16} /> Profile
                  </Link>

                  <Link
                    href="/customer/settings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50"
                  >
                    <Settings size={16} /> Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-black"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* ✅ MOBILE MENU DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-orange-600"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="block bg-orange-600 text-white text-center py-2 rounded-md"
            >
              Sign Up
            </Link>
          ) : (
            <>
              <div className="border-t pt-4">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              <Link
                href="/customer/settings"
                onClick={() => setOpen(false)}
                className="block text-gray-700 hover:text-orange-600"
              >
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
