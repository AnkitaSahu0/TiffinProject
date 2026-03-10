

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';




export default function Order() {
  return (
    <div
      className="
        space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-10
        transition-colors duration-300 dark:bg-black
      "
    >
      {/* Heading */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 transition-colors">
        Welcome Back 👋
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card title="Subscription" value="Active" />
        <Card title="Today's Meal" value="Roti, Dal, Sabzi" />
        <Card title="Delivery Status" value="Out for Delivery" />
        <Card title="Next Renewal" value="25 Jan 2026" />
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Action label="Manage Plan" link="/customer/dashboard/plan" />
        <Action label="Pause Meal" link="/customer/pause-meal" />
        <Action label="View Menu" link="/customer/dashboard/menu" />
        <Action label="Settings" link="/customer/settings" />
      </div>
    </div>
  );
}

/* ================= Card ================= */
const Card = ({ title, value }: any) => (
  <div
    className="
      bg-white dark:bg-gray-800
      rounded-xl shadow-sm
      p-4 sm:p-5
      hover:shadow-md transition
      min-h-[90px]
      flex flex-col justify-center
      transition-colors duration-300
    "
  >
    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm transition-colors">
      {title}
    </p>

    <h3 className="text-lg sm:text-xl font-bold mt-1 text-gray-800 dark:text-gray-100 transition-colors">
      {value}
    </h3>
  </div>
);

/* ================= Action Button ================= */
const Action = ({ label, link }: any) => (
  <a
    href={link}
    className="
      bg-orange-500 hover:bg-orange-600
      text-white
      py-2.5 sm:py-3
      rounded-lg text-center
      text-xs sm:text-sm font-bold
      transition
    "
  >
    {label}
  </a>
);
