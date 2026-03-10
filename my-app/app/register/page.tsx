// "use client";
// import { apiRequest } from "@/lib/api";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import Navbar from "@/components/common/Navbar";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (Object.values(form).some((v) => v === "")) {
//     setError("All fields are required");
//     return;
//   }

//   try {
//     setLoading(true);

//     // 🔹 Simulate API call
//     await new Promise((res) => setTimeout(res, 1200));

//     // ✅ SAVE USER (important)
//     const userData = {
//       id: Date.now(),
//       name: form.name,
//       email: form.email,
//     };

//     localStorage.setItem("user", JSON.stringify(userData));

//     toast.success("🎉 Registration successful!");

//     setTimeout(() => {
//       router.push("/customer/dashboard");
//     }, 1200);

//   } catch (err) {
//     toast.error("Something went wrong. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };





//   return (
//     <>
//     <Navbar />
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 to-red-100 px-4">
//       <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-lg shadow-red-400">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
//           Create Account ✨
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm text-center mb-4">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

//           <input
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

//           <input
//             name="address"
//             placeholder="Address"
//             value={form.address}
//             onChange={handleChange}
//             className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition disabled:opacity-60"
//           >
//             {loading ? "Creating..." : "Register"}
//           </button>
//         </form>

//         <p className="text-center text-sm mt-4 text-gray-700">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="text-orange-600 font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div></>
//   );
// }








"use client";
import { apiRequest, BASE_URL } from "@/lib/api";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/common/Navbar";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (Object.values(form).some((v) => v === "")) {
    setError("All fields are required");
    return;
  }

  try {
    setLoading(true);

    //  CALL REAL BACKEND API
    const data = await apiRequest(`${BASE_URL}/api/auth/register`, "POST", {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    //  If backend returns success
    if (data.message) {

      // Save user info (same as your old logic)
      const userData = {
        name: form.name,
        email: form.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("🎉 Registration successful!");

      router.push("/customer/dashboard");

    } else {
      setError(data.error || "Registration failed");
      toast.error(data.error || "Registration failed");
    }

  } catch (err) {
    toast.error("Server error. Make sure backend is running.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};





  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-orange-100 to-red-100 px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-lg shadow-red-400">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
          Create Account ✨
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="text-gray-700 w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div></>
  );
}







