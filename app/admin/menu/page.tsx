"use client";

import Image from "next/image";
import { useState } from "react";

/* ---------------- TYPES ---------------- */

type MealCategory = "Veg" | "Non-Veg";

interface MenuItem {
  id: number;
  name: string;
  category: MealCategory;
  image?: string;
}

interface DailyMenu {
  date: string;
  items: MenuItem[];
}

/* ---------------- COMPONENT ---------------- */

export default function MenuManagementPage() {
  const [menuDate, setMenuDate] = useState("");
  const [mealName, setMealName] = useState("");
  const [mealCategory, setMealCategory] = useState<MealCategory>("Veg");
  const [mealImage, setMealImage] = useState<string | null>(null);

  const [menus, setMenus] = useState<DailyMenu[]>([]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setMealImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addMealToDate = () => {
    if (!menuDate || !mealName) return;

    const newMeal: MenuItem = {
      id: Date.now(),
      name: mealName,
      category: mealCategory,
      image: mealImage || undefined,
    };

    setMenus((prev) => {
      const existingMenu = prev.find((m) => m.date === menuDate);

      if (existingMenu) {
        return prev.map((m) =>
          m.date === menuDate ? { ...m, items: [...m.items, newMeal] } : m,
        );
      }

      return [...prev, { date: menuDate, items: [newMeal] }];
    });

    setMealName("");
    setMealImage(null);
  };

  const removeMeal = (date: string, id: number) => {
    setMenus((prev) =>
      prev.map((m) =>
        m.date === date
          ? {
              ...m,
              items: m.items.filter((item) => item.id !== id),
            }
          : m,
      ),
    );
  };

  /* ---------------- UI ---------------- */

  return (
   
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 ml-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">
            Menu Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Create & update daily menus</p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-8 border dark:border-slate-700 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Meal</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {/* DATE */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Menu Date
              </label>
              <input
                type="date"
                value={menuDate}
                onChange={(e) => setMenuDate(e.target.value)}
                className="mt-1 w-full rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2
                  text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            {/* MEAL NAME */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Meal Name
              </label>
              <input
                type="text"
                placeholder="Dal Tadka"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="mt-1 w-full rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2
                  text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Category
              </label>
              <select
                value={mealCategory}
                onChange={(e) =>
                  setMealCategory(e.target.value as MealCategory)
                }
                className="mt-1 w-full rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2
                  text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </div>

            {/* IMAGE */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Meal Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 dark:file:bg-slate-700 dark:file:text-orange-400"
              />
            </div>

            {/* BUTTON */}
            <div className="flex items-end sm:col-span-2 md:col-span-1">
              <button
                onClick={addMealToDate}
                className="w-full rounded-lg bg-orange-500 px-4 py-2
                  font-semibold text-white hover:bg-orange-600
                  active:scale-95 transition shadow-lg shadow-orange-500/20"
              >
                ➕ Add Meal
              </button>
            </div>
          </div>

          {/* IMAGE PREVIEW */}
          {mealImage && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Preview
              </p>
              <Image
                src={mealImage}
                alt="Meal Preview"
                className="h-28 w-28 rounded-lg object-cover border dark:border-slate-600 shadow-md"
              />
            </div>
          )}
        </div>

        {/* MENU LIST */}
        {menus.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 text-center text-gray-500 dark:text-gray-400 border dark:border-slate-700">
            No menu created yet
          </div>
        )}

        {menus.map((menu) => (
          <div
            key={menu.date}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6 border dark:border-slate-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-xl">📅</span> {menu.date}
            </h3>

            <ul className="space-y-3">
              {menu.items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4
                    rounded-xl border border-gray-100 dark:border-slate-700 px-4 py-3
                    hover:bg-orange-50 dark:hover:bg-slate-700 transition-all duration-200"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover shadow-sm"
                    />
                  )}

                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      item.category === 'Veg' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => removeMeal(menu.date, item.id)}
                    className="self-start sm:self-auto
                      text-xs font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="mt-6 text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
          <span className="animate-pulse">●</span> ✅ Changes reflect instantly on the customer menu.
        </p>
      </div>
    </div>
  );
}