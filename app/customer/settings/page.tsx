"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    
  });

  const [message, setMessage] = useState("");

 // Auto fill user data
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const storedUser = JSON.parse(userString);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: storedUser.name || "",
        email: storedUser.email || "",
        address: storedUser.address || "",
        phone: storedUser.phone || "",
        password: "",
      });
    }
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error);
    } else {
      setMessage(data.message);

      // Update localStorage user
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-md sm:max-w-lg mx-auto bg-white p-5 sm:p-8 rounded-2xl shadow-md">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
          Profile Settings ⚙️
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Update your personal information
        </p>

        {/* FORM */}
        <div className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="w-full mt-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="w-full mt-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Enter your address"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full mt-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>

          {/* password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
             Password
            </label>
            <input
              type="tel"
              className="w-full mt-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>
        </div>
        
          {message && (
          <p className="mt-4 text-green-600 font-medium">{message}</p>
        )}

        {/* BUTTON */}
        <button  onClick={handleSubmit} className="w-full mt-6 bg-orange-600 text-white py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
