

export default function PaymentsPage() {
  return (
    <div className="
      min-h-screen 
      bg-gradient-to-br from-orange-50 via-white to-blue-50
      dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
      transition-colors duration-300
    ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Payments & Balance
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            Manage your wallet, recharges and transactions
          </p>
        </div>

        {/* Wallet + Recharge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          
          {/* Wallet Card */}
          <div className="lg:col-span-2 relative rounded-3xl p-6 sm:p-10 
                          text-white shadow-2xl overflow-hidden
                          bg-gradient-to-br from-orange-500 to-red-400">
            <div className="relative z-10">
              <p className="text-white/80 text-xs sm:text-sm font-semibold uppercase">
                Available Balance
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-2">
                ₹450.00
              </h2>

              <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-10">
                <div className="w-12 h-9 sm:w-14 sm:h-10 bg-white/20 rounded-lg"></div>
                <span className="text-xs text-white/80">Tiffin Wallet</span>
              </div>
            </div>

            <div className="absolute -top-16 -right-16 w-52 sm:w-64 h-52 sm:h-64 bg-white/5 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-60 sm:w-72 h-60 sm:h-72 bg-orange-400/20 rounded-full"></div>
          </div>

          {/* Recharge Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition">
            <h3 className="font-extrabold text-gray-800 dark:text-gray-100 mb-5 sm:mb-6 text-sm sm:text-base">
              ⚡ Quick Recharge
            </h3>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
              {["₹200", "₹500", "₹1000"].map((amt) => (
                <button
                  key={amt}
                  className="py-2 rounded-full border 
                             text-gray-700 dark:text-gray-200
                             border-gray-300 dark:border-gray-600
                             font-bold text-xs sm:text-sm
                             hover:border-orange-500 hover:text-orange-600
                             dark:hover:border-orange-400 dark:hover:text-orange-400
                             transition"
                >
                  {amt}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Enter custom amount"
              className="w-full p-2.5 sm:p-3 border rounded-xl 
                         text-xs sm:text-sm outline-none
                         bg-white dark:bg-gray-700
                         text-gray-800 dark:text-gray-100
                         border-gray-300 dark:border-gray-600
                         focus:border-orange-500 mb-4 sm:mb-5"
            />

            <button
              className="w-full py-2.5 sm:py-3 rounded-xl 
                         bg-gradient-to-r from-orange-500 to-orange-400
                         text-white font-bold shadow-lg 
                         hover:opacity-90 transition"
            >
              Proceed to Pay
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden transition">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 
                          border-b bg-gray-50 dark:bg-gray-700 
                          border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2">
              <span>🧾</span>
              <h3 className="font-extrabold text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                Wallet History
              </h3>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-400">
              Last Transactions
            </span>
          </div>

          {/* History List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {[
              {
                date: "25 Jan 2026",
                desc: "Daily Meal - Lunch",
                type: "Debit",
                amt: "-₹120",
                status: "Success",
              },
              {
                date: "20 Jan 2026",
                desc: "Wallet Recharge - UPI",
                type: "Credit",
                amt: "+₹2000",
                status: "Success",
              },
            ].map((row, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                           px-4 sm:px-6 py-4 sm:py-5 gap-3
                           hover:bg-gray-50 dark:hover:bg-gray-700
                           transition"
              >
                {/* Left */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-base
                    ${
                      row.type === "Credit"
                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {row.type === "Credit" ? "⬇️" : "⬆️"}
                  </div>

                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                      {row.desc}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-400">
                      {row.date}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-left sm:text-right">
                  <p
                    className={`font-extrabold text-xs sm:text-sm
                    ${
                      row.amt.includes("+")
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {row.amt}
                  </p>
                  <span
                    className="inline-block mt-1 text-[9px] sm:text-[10px] 
                               font-bold text-green-600 dark:text-green-400
                               bg-green-50 dark:bg-green-900
                               px-3 py-1 rounded-full"
                  >
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
