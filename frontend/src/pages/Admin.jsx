import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus, X } from "lucide-react";

import { BASE_URL } from "../config";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "candles",
    stock: 10,
  });

  const [images, setImages] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      category: "candles",
      stock: 10,
    });
    setImages([]);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);

    images.forEach((img) => formData.append("images", img));

    try {
      if (editingProduct) {
        await axios.put(
          `${BASE_URL}/api/products/${editingProduct._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        toast.success("Product updated");
      } else {
        await axios.post(`${BASE_URL}/api/products`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product added");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Upload failed. Check backend logs.");
    }
  };

  const handleEdit = (p) => {
    setEditingProduct(p);
    setForm({
      title: p.title || "",
      description: p.description || "",
      price: p.price || "",
      category: p.category || "candles",
      stock: p.stock || 10,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#121212]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold heading-font text-primary">
          My Workspace
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl hover:bg-amber-700"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl shadow-xl mb-10">
          <h2 className="text-2xl mb-6">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="border p-4 rounded-2xl"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              className="border p-4 rounded-2xl h-28"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="border p-4 rounded-2xl"
              />
              <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
                className="border p-4 rounded-2xl"
              />
            </div>

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border p-4 rounded-2xl"
            >
              <option value="candles">Candles</option>
              <option value="crochet">Crochet</option>
            </select>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="border p-4 rounded-2xl"
            />

            <button
              type="submit"
              className="bg-primary text-white py-4 rounded-2xl"
            >
              {editingProduct ? "Update" : "Add"} Product
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden shadow"
          >
            <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
              {p.images && p.images.length > 0 ? (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-8xl">
                  {p.category === "candles" ? "🕯️" : "🧶"}
                </span>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-primary">₹{p.price}</p>
              <p>Stock: {p.stock}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 py-2 bg-blue-100 rounded-xl"
                >
                  <Pencil />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 py-2 bg-red-100 rounded-xl"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
