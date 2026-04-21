import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;

      toast.success(`Welcome back, ${res.data.user.name} ✨`);

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft dark:bg-[#121212] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-xl p-8 sm:p-10 transition">
        <div className="text-center mb-8">
          <h1 className="heading-font text-4xl sm:text-5xl text-primary mb-2">
            Wick & Weave
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Welcome back to cozy handmade warmth
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-5 py-3 rounded-xl border bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl border bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-amber-700 text-white rounded-xl font-medium disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
