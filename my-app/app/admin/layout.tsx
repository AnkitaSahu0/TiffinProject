


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes"; 

 // Import theme hook
import {
  LayoutDashboard,
  ClipboardList,
  PauseCircle,
  CreditCard,
  Truck,
  Utensils,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
   const router = useRouter();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme(); // Theme toggle functionality
  const [mounted, setMounted] = useState(false);

  // to avoid hydration error
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

 
 
 

  /* ================= ADMIN STATE ================= */
  const [admin, setAdmin] = useState<{
    name: string;
    id: string;
  } | null>(null);

 useEffect(() => {
    localStorage.setItem(
      "admin",
      JSON.stringify({
        name: "Admin ",
        id: "admin@gmail.com"
      })
    );
  }, []);


  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    router.push("/login");
  };

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard /> },
    { name: "Plans", href: "/admin/plans", icon: <ClipboardList /> },
    { name: "Pause Requests", href: "/admin/pause", icon: <PauseCircle /> },
    { name: "Payments", href: "/admin/payments", icon: <CreditCard /> },
    { name: "Daily Delivery", href: "/admin/delivery", icon: <Truck /> },
    { name: "Menu", href: "/admin/menu", icon: <Utensils /> },
  ];

  return (
    <>
      
      <div className="min-h-screen flex bg-gray-100 dark:bg-slate-950 transition-colors duration-300 relative">
        
        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden fixed top-5 left-2 z-50 bg-white dark:bg-gray-800 text-black dark:text-white p-1 ml-1 rounded-md"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>

        {/* MOBILE OVERLAY */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            flex flex-col h-screen
          w-64 bg-gray-300 dark:bg-gray-900 text-black dark:text-white p-5
          md:flex md:flex-col 
           fixed md:sticky md:top-0
          z-50 top-0 left-0
          h-screen
           h-full md:h-screen 
           md:overflow-y-auto
           transition-transform duration-300
           ${open ? "translate-x-0" : "-translate-x-full"}
           md:translate-x-0
          `}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-orange-400">Admin Panel</h2>
            <button className="md:hidden" onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <nav className="space-y-3 flex-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                  ${
                    pathname === link.href
                      ? "bg-orange-600 text-white"
                      : "text-black dark:text-white hover:bg-orange-600 hover:text-white"
                      
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {/* --- LIGHT/DARK TOGGLE BUTTON --- */}
            {mounted && (
              <div className="  border-gray-700">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-3 px-3 py-2 w-full rounded-md transition text-black dark:text-white hover:bg-orange-600 hover:text-white"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={20} className="text-yellow-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={20} className="text-blue-400" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </nav>

             {/* ================= ADMIN INFO  ================= */}
          {admin && (
          <div className="mt-auto mb-6 px-2">
   <p className="text-sm font-bold">{admin.name}</p>
  <p className="text-xs text-gray-800 dark:text-white">ID: {admin.id}</p>

   <button
     onClick={handleLogout}
    className="mt-2 w-full text-sm text-white hover:text-red-300
               border border-red-500 p-1 rounded-xl
               bg-red-500 cursor-pointer"
  >
     Logout
  </button>
</div> 
          )}

    </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-slate-900 text-black dark:text-white transition-colors">
  {children}
</main>
      </div>
    </>
  );
}