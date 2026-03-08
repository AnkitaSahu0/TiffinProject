

"use client";

import React, { useState } from "react";

/* ---------------- TYPES ---------------- */

interface PauseEntry {
  id: number;
  customerName: string;
  phone: string;
  planName: string;
  pauseFrom: string;
  pauseTo: string;
  reason?: string;
}

/* ---------------- COMPONENT ---------------- */

export default function PauseManagementPage() {
  const [pausedCustomers, setPausedCustomers] = useState<PauseEntry[]>([
    {
      id: 1,
      customerName: "Rahul Sharma",
      phone: "9876543210",
      planName: "Monthly Veg",
      pauseFrom: "2026-01-20",
      pauseTo: "2026-01-25",
      reason: "Out of station",
    },
    {
      id: 2,
      customerName: "Anita Verma",
      phone: "9123456789",
      planName: "Weekly Combo",
      pauseFrom: "2026-01-22",
      pauseTo: "2026-01-22",
      reason: "Personal",
    },
  ]);

  const today = new Date().toISOString().split("T")[0];

  const isPausedToday = (from: string, to: string) =>
    today >= from && today <= to;

  const resumeDelivery = (id: number) => {
    setPausedCustomers((prev) => prev.filter((entry) => entry.id !== id));
  };

  /* ---------------- UI ---------------- */

  return (
    
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 ml-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">
            Pause Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track customers with paused deliveries in real time
          </p>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border dark:border-slate-700 transition-colors">
          <table className="min-w-full text-sm">
            <thead className="bg-orange-100 dark:bg-orange-600/20 text-gray-900 dark:text-orange-400">
              <tr>
                <th className="px-4 py-4 text-left">Customer</th>
                <th className="px-4 py-4 text-left">Phone</th>
                <th className="px-4 py-4 text-left">Plan</th>
                <th className="px-4 py-4 text-left">From</th>
                <th className="px-4 py-4 text-left">To</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4 text-left">Reason</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {pausedCustomers.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500 dark:text-gray-400">
                    🎉 No paused customers
                  </td>
                </tr>
              )}

              {pausedCustomers.map((entry) => {
                const pausedToday = isPausedToday(
                  entry.pauseFrom,
                  entry.pauseTo,
                );

                return (
                  <tr
                    key={entry.id}
                    className={`
                      transition-all duration-200
                      ${pausedToday 
                        ? "bg-red-50/50 dark:bg-red-900/10" 
                        : "hover:bg-orange-50 dark:hover:bg-slate-700/50"}
                    `}
                  >
                    <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                      {entry.customerName}
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{entry.phone}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{entry.planName}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{entry.pauseFrom}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{entry.pauseTo}</td>
                    <td className="px-4 py-4 text-center">
                      {pausedToday ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse border border-red-200 dark:border-red-800">
                          Paused Today
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                          Scheduled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 italic text-gray-500 dark:text-gray-400">{entry.reason || "—"}</td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => resumeDelivery(entry.id)}
                        className="px-4 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition shadow-md shadow-orange-500/20 active:scale-95"
                      >
                        Resume
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4">
          {pausedCustomers.length === 0 && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center text-gray-500 dark:text-gray-400 border dark:border-slate-700">
              🎉 No paused customers
            </div>
          )}

          {pausedCustomers.map((entry) => {
            const pausedToday = isPausedToday(entry.pauseFrom, entry.pauseTo);

            return (
              <div
                key={entry.id}
                className={`bg-white dark:bg-slate-800 rounded-xl shadow p-5 space-y-3 border dark:border-slate-700 transition-colors ${
                  pausedToday ? "border-l-4 border-l-red-500" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {entry.customerName}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                      pausedToday
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                    }`}
                  >
                    {pausedToday ? "Paused Today" : "Scheduled"}
                  </span>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p className="flex items-center gap-2">📞 {entry.phone}</p>
                  <p className="flex items-center gap-2">📦 {entry.planName}</p>
                  <p className="flex items-center gap-2">
                    📅 <span className="font-mono">{entry.pauseFrom}</span> → <span className="font-mono">{entry.pauseTo}</span>
                  </p>
                  <p className="italic text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900/50 p-2 rounded">📝 {entry.reason || "No reason provided"}</p>
                </div>

                <button
                  onClick={() => resumeDelivery(entry.id)}
                  className="w-full mt-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  Resume Delivery
                </button>
              </div>
            );
          })}
        </div>

        {/* WARNING */}
        <div className="mt-6 flex items-start gap-3 bg-red-100 dark:bg-red-900/20 border-l-4 border-red-600 p-4 rounded-lg text-red-800 dark:text-red-400 transition-colors">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">
            Customers marked <b>Paused Today</b> must <b>NOT</b> receive
            delivery today.
          </p>
        </div>
      </div>
    </div>
  );
}