import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.message) {
      toast.error("Message required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success("We’ll get back within 24hrs ✨");
      setForm({
        name: "",
        email: "",
        type: "general",
        message: "",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-soft dark:bg-[#121212] px-4 py-8 md:py-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="bg-white dark:bg-[#1e1e1e] p-6 md:p-8 rounded-2xl shadow transition">
          <h1 className="heading-font text-3xl mb-4 text-gray-800 dark:text-white">
            Contact Support
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            Need help with orders, returns, or products? We're here for you.
          </p>

          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div>📧 hello@wickandweave.com</div>
            <div>📞 +91 98765 43210</div>
            <div>🕒 9:00 AM – 7:00 PM (Mon–Sat)</div>
          </div>

          {/* QUICK HELP */}
          <div className="mt-6 border-t pt-4 dark:border-gray-700">
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Quick Help
            </h3>

            <ul className="text-xs space-y-2 text-gray-500 dark:text-gray-400">
              <li>• Track your orders from profile</li>
              <li>• Returns available within 7 days</li>
              <li>• Exchange available for damaged items</li>
            </ul>
          </div>
        </div>

        {/* FORM PANEL */}
        <div className="bg-white dark:bg-[#1e1e1e] p-6 md:p-8 rounded-2xl shadow transition">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-primary transition"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-primary transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <select
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 focus:outline-none focus:border-primary transition"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="general">General Inquiry</option>
              <option value="order">Order Issue</option>
              <option value="return">Return / Exchange</option>
              <option value="bulk">Bulk / Custom Orders</option>
            </select>

            <textarea
              placeholder="Describe your issue..."
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 placeholder-gray-400 h-32 focus:outline-none focus:border-primary transition"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-amber-700 transition disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
