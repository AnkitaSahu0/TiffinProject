import { Users, ShoppingBag, PauseCircle, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Quick overview of today’s business performance
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Customers"
          value="124"
          icon={<Users size={28} />}
          gradient="from-orange-500 to-red-500"
        />

        <StatCard
          title="Today Orders"
          value="56"
          icon={<ShoppingBag size={28} />}
          gradient="from-amber-400 to-orange-500"
        />

        <StatCard
          title="Paused Requests"
          value="8"
          icon={<PauseCircle size={28} />}
          gradient="from-gray-500 to-gray-700"
        />

        <StatCard
          title="Monthly Revenue"
          value="₹25,000"
          icon={<IndianRupee size={28} />}
          gradient="from-green-500 to-emerald-600"
        />
      </div>
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({
  title,
  value,
  icon,
  gradient,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl bg-white
        p-6 shadow-lg
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
        cursor-pointer
      "
    >
      {/* GLOW */}
      <div
        className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-2xl`}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h2 className="mt-2 text-3xl font-extrabold text-orange-600">
            {value}
          </h2>
        </div>

        <div
          className={`flex items-center justify-center
            h-12 w-12 rounded-xl
            bg-gradient-to-br ${gradient}
            text-white shadow-md
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
