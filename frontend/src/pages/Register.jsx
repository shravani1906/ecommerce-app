import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match 💔");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(
        `Welcome to Wick & Weave, ${form.name}! ✨ Your account is ready.`,
      );
      navigate("/"); // Go to home page after successful register
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft py-12 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="heading-font text-5xl text-primary mb-2">
            Wick & Weave
          </h1>
          <p className="text-gray-600">Join our cozy handmade community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary transition"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary transition"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary transition"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary transition"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-amber-700 text-white rounded-2xl font-medium transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? "Creating your account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
