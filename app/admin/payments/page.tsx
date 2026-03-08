/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { useMemo, useState } from "react";

/* ---------------- TYPES ---------------- */

type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED";

interface Payment {
  id: number;
  customerName: string;
  phone: string;
  planName: string;
  amount: number;
  paymentDate: string;
  transactionId: string;
  status: PaymentStatus;
}

/* ---------------- COMPONENT ---------------- */

export default function PaymentManagementPage() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      customerName: "Rahul Sharma",
      phone: "9876543210",
      planName: "Monthly Veg",
      amount: 2500,
      paymentDate: "2026-01-20",
      transactionId: "TXN123456",
      status: "SUCCESS",
    },
    {
      id: 2,
      customerName: "Anita Verma",
      phone: "9123456789",
      planName: "Weekly Combo",
      amount: 850,
      paymentDate: "2026-01-22",
      transactionId: "TXN789012",
      status: "PENDING",
    },
    {
      id: 3,
      customerName: "Vikas Patel",
      phone: "9001122334",
      planName: "Monthly Non-Veg",
      amount: 3200,
      paymentDate: "2026-01-23",
      transactionId: "TXN445566",
      status: "FAILED",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PaymentStatus | "ALL">("ALL");

  /* ---------------- ACTIONS ---------------- */

  const verifyPayment = (id: number) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "SUCCESS" } : p)),
    );
  };

  /* ---------------- DERIVED DATA ---------------- */

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        p.customerName.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search) ||
        p.transactionId.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "ALL" || p.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [payments, search, filter]);

  const totalRevenue = payments
    .filter((p) => p.status === "SUCCESS")
    .reduce((sum, p) => sum + p.amount, 0);

  /* ---------------- UI HELPERS ---------------- */

  const statusStyle = (status: PaymentStatus) => {
    switch (status) {
      case "SUCCESS":
        // Dark mode friendly green
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800";
      case "PENDING":
        // Dark mode friendly orange
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800";
      case "FAILED":
        // Dark mode friendly red
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800";
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 ml-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">
            Payment Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Search, verify, and monitor all customer payments
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Payments" value={payments.length} />
          <StatCard
            title="Successful"
            value={payments.filter((p) => p.status === "SUCCESS").length}
          />
          <StatCard
            title="Pending"
            value={payments.filter((p) => p.status === "PENDING").length}
          />
          <StatCard title="Revenue" value={`₹${totalRevenue}`} highlight />
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <input
            placeholder="Search by name, phone or transaction ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 outline-none transition-all"
          />

          <div className="flex flex-wrap gap-2">
            {["ALL", "SUCCESS", "PENDING", "FAILED"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition
                  ${
                    filter === s
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-white dark:bg-slate-800 border dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-slate-700"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border dark:border-slate-700 transition-colors">
          <table className="min-w-full text-sm">
            <thead className="bg-orange-100 dark:bg-orange-600/20 text-gray-900 dark:text-orange-400">
              <tr>
                <th className="px-5 py-4 text-left">Customer</th>
                <th className="px-5 py-4 text-left">Plan</th>
                <th className="px-5 py-4 text-left">Amount</th>
                <th className="px-5 py-4 text-left">Date</th>
                <th className="px-5 py-4 text-left">Transaction</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filteredPayments.map((p) => (
                <tr
                  key={p.id}
                  className="transition-colors hover:bg-orange-50 dark:hover:bg-slate-700/50"
                >
                  <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">
                    {p.customerName}
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">{p.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">{p.planName}</td>
                  <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">₹{p.amount}</td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{p.paymentDate}</td>
                  <td className="px-5 py-4 text-xs font-mono text-gray-500 dark:text-gray-400">
                    {p.transactionId}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusStyle(p.status)}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {p.status === "PENDING" && (
                      <button
                        onClick={() => verifyPayment(p.id)}
                        className="px-4 py-1.5 text-xs rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition active:scale-95 shadow-md shadow-orange-500/20"
                      >
                        Verify
                      </button>
                    )}
                    {p.status === "SUCCESS" && (
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold flex items-center justify-center gap-1">
                        Verified ✓
                      </span>
                    )}
                    {p.status === "FAILED" && (
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold flex items-center justify-center gap-1">
                        Retry Needed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 transition-colors">
              No matching payments found
            </div>
          )}
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4">
          {filteredPayments.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-5 space-y-3 border dark:border-slate-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{p.customerName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.phone}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusStyle(p.status)}`}
                >
                  {p.status}
                </span>
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg">
                <p className="flex justify-between"><span>📦 Plan:</span> <span className="font-medium">{p.planName}</span></p>
                <p className="flex justify-between"><span>💰 Amount:</span> <span className="font-bold text-orange-600 dark:text-orange-400">₹{p.amount}</span></p>
                <p className="flex justify-between"><span>📅 Date:</span> <span>{p.paymentDate}</span></p>
                <p className="font-mono text-[10px] text-gray-400 mt-2 border-t dark:border-slate-700 pt-2 break-all">ID: {p.transactionId}</p>
              </div>

              {p.status === "PENDING" && (
                <button
                  onClick={() => verifyPayment(p.id)}
                  className="w-full mt-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
                >
                  Verify Payment
                </button>
              )}
            </div>
          ))}

          {filteredPayments.length === 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 text-center text-gray-500 dark:text-gray-400 border dark:border-slate-700">
              No matching payments found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function StatCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 shadow-sm border transition-all duration-300 ${
        highlight 
          ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20" 
          : "bg-white dark:bg-slate-800 border-transparent dark:border-slate-700 text-gray-900 dark:text-white"
      }`}
    >
      <p className="text-[10px] uppercase tracking-wider font-bold opacity-80">{title}</p>
      <h3 className="text-2xl font-black mt-1">{value}</h3>
    </div>
  );
}