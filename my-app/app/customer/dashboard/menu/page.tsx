


const weeklyMenu = [
  {
    day: "Monday",
    lunch: "Paneer Butter Masala, 4 Roti, Dal, Rice",
    dinner: "Aloo Gobi, 4 Roti, Dal, Salad",
  },
  {
    day: "Tuesday",
    lunch: "Rajma Chawal, Raita, Salad",
    dinner: "Mix Veg, 4 Roti, Dal Fry",
  },
  {
    day: "Wednesday",
    lunch: "Chole Bhature, Lassi",
    dinner: "Egg Curry / Paneer Bhurji, 4 Roti",
  },
  {
    day: "Thursday",
    lunch: "Kadhi Pakoda, Rice, Jeera Aloo",
    dinner: "Dal Makhani, 2 Naan, Rice",
  },
  {
    day: "Friday",
    lunch: "Veg Biryani, Raita, Papad",
    dinner: "Matar Paneer, 4 Roti, Salad",
  },
  {
    day: "Saturday",
    lunch: "Khichdi, Kadhi, Papad, Achar",
    dinner: "Special Thali (Poori, Halwa, Chana)",
  },
];

export default function MenuPage() {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-orange-100 via-white to-blue-50
        dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
        transition-colors duration-300
      "
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-gray-100 transition-colors">
            Weekly Menu
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 transition-colors">
            Fresh & healthy meals for the whole week
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {weeklyMenu.map((item) => (
            <div
              key={item.day}
              className="
                rounded-2xl p-4 sm:p-6
                bg-gradient-to-b from-orange-200 to-red-50
                dark:from-gray-700 dark:to-gray-900
                shadow-md hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              {/* Day */}
              <div className="text-center mb-4 sm:mb-6">
                <span
                  className="
                    inline-block
                    bg-white/30 dark:bg-white/10
                    px-4 py-1.5 sm:px-5 sm:py-2
                    rounded-full
                    text-xs sm:text-sm
                    font-bold tracking-wide uppercase
                    text-gray-900 dark:text-gray-100
                  "
                >
                  {item.day}
                </span>
              </div>

              {/* Meals */}
              <div className="space-y-3 sm:space-y-4">
                {/* Lunch */}
                <div className="bg-white/40 dark:bg-gray-700/40 p-3 sm:p-4 rounded-xl transition-colors">
                  <p className="text-xs sm:text-sm font-bold uppercase mb-1 text-orange-600 dark:text-orange-400">
                    🍛 Lunch
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.lunch}
                  </p>
                </div>

                {/* Dinner */}
                <div className="bg-white/40 dark:bg-gray-700/40 p-3 sm:p-4 rounded-xl transition-colors">
                  <p className="text-xs sm:text-sm font-bold uppercase mb-1 text-blue-600 dark:text-blue-400">
                    🌙 Dinner
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.dinner}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
