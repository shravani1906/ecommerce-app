import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { BASE_URL } from "../config";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);

  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/reviews`);
        setReviews(res.data || []);
      } catch {
        toast.error("Failed to load reviews");
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.message) {
      return toast.error("Fill all fields");
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/reviews`, form);

      setReviews((prev) => [res.data, ...prev]);
      setForm({ name: "", message: "", rating: 5 });

      toast.success("Thanks!");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="min-h-screen bg-soft px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Testimonials</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            className="w-full p-3 border rounded-xl"
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <select
            className="w-full p-3 border rounded-xl"
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>

          <button className="w-full bg-primary text-white py-3 rounded-xl">
            Submit
          </button>
        </form>

        <div className="grid gap-4">
          {reviews.map((r) => (
            <div key={r._id} className="p-4 border rounded-xl">
              <h3>{r.name}</h3>
              <p>{"⭐".repeat(r.rating)}</p>
              <p>{r.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
