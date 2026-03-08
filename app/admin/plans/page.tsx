

"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

/* ---------------- TYPES ---------------- */

interface Plan {
  id: number;
  name: string;
  price: number;
  duration: number;
  mealsPerDay: number;
  visible: boolean;
}

const emptyPlan: Plan = {
  id: 0,
  name: "",
  price: 0,
  duration: 0,
  mealsPerDay: 0,
  visible: true,
};

/* ---------------- COMPONENT ---------------- */

const PlanManagement: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [form, setForm] = useState<Plan>(emptyPlan);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : Number.isNaN(Number(value))
            ? value
            : Number(value),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (form.id) {
      setPlans((prev) => prev.map((p) => (p.id === form.id ? form : p)));
    } else {
      setPlans((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    resetForm();
  };

  const editPlan = (plan: Plan) => setForm(plan);

  const deletePlan = (id: number) =>
    setPlans((prev) => prev.filter((p) => p.id !== id));

  const resetForm = () => setForm(emptyPlan);

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="ml-6 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Plan Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create, update and manage subscription plans
            </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 sm:p-6 mb-10 border dark:border-slate-700 transition-colors"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-6">
            {form.id ? "Update Plan" : "Create New Plan"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PLAN NAME */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Plan Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Eg. Monthly Tiffin Plan"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 py-2
                focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                required
              />
            </div>

            {/* PRICE */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Eg. 2500"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 py-2
                focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                required
              />
            </div>

            {/* DURATION */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Duration (Days)
              </label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Eg. 30"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 py-2
                focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                required
              />
            </div>

            {/* MEALS */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Meals Per Day
              </label>
              <input
                type="number"
                name="mealsPerDay"
                value={form.mealsPerDay}
                onChange={handleChange}
                placeholder="Eg. 2"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 py-2
                focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* VISIBILITY */}
          <div className="flex items-center gap-3 mt-5">
            <input
              type="checkbox"
              name="visible"
              checked={form.visible}
              onChange={handleChange}
              className="accent-orange-500 scale-110 cursor-pointer"
            />
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Visible to customers
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg
              hover:bg-orange-600 transition font-semibold shadow-lg shadow-orange-500/20 active:scale-95"
            >
              {form.id ? "Update Plan" : "Create Plan"}
            </button>

            {form.id !== 0 && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-orange-400 text-orange-600 dark:text-orange-400 px-6 py-2
                rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 transition font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border dark:border-slate-700 transition-colors">
          <table className="min-w-full text-sm">
            <thead className="bg-orange-100 dark:bg-orange-600/20 text-gray-900 dark:text-orange-400">
              <tr>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Meals / Day</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Visible</th>
                <th className="px-6 py-4 text-center font-bold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {plans.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500 dark:text-gray-400">
                    No plans created yet
                  </td>
                </tr>
              )}

              {plans.map((plan) => (
                <tr key={plan.id} className="transition-colors hover:bg-orange-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{plan.name}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">₹{plan.price}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{plan.duration} days</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{plan.mealsPerDay}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      plan.visible 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400"
                    }`}>
                      {plan.visible ? "YES" : "NO"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-6">
                        <button
                          onClick={() => editPlan(plan)}
                          className="text-orange-600 dark:text-orange-400 font-bold hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          className="text-red-500 dark:text-red-400 font-bold hover:underline"
                        >
                          Delete
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-5 border dark:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{plan.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      plan.visible 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400"
                  }`}>
                      {plan.visible ? "Visible" : "Hidden"}
                  </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg">
                  <p>💰 <span className="font-bold">₹{plan.price}</span></p>
                  <p>📆 {plan.duration} days</p>
                  <p>🍱 {plan.mealsPerDay} meals/day</p>
              </div>

              <div className="flex gap-4 border-t dark:border-slate-700 pt-4">
                <button
                  onClick={() => editPlan(plan)}
                  className="flex-1 py-2 rounded-lg border border-orange-500 text-orange-500 dark:text-orange-400 font-bold text-sm hover:bg-orange-50 dark:hover:bg-orange-900/10 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="flex-1 py-2 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {plans.length === 0 && (
            <div className="bg-white dark:bg-slate-800 p-8 text-center rounded-xl shadow text-gray-500 dark:text-gray-400 border dark:border-slate-700">
              No plans created yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanManagement;