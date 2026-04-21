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
      setProducts(res.data || []);
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

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      images.forEach((img) => formData.append("images", img));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingProduct) {
        await axios.put(
          `${BASE_URL}/api/products/${editingProduct._id}`,
          formData,
          config,
        );
        toast.success("Product updated");
      } else {
        await axios.post(`${BASE_URL}/api/products`, formData, config);
        toast.success("Product added");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Error saving product");
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

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#121212]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold heading-font text-primary">
          My Workspace
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl hover:bg-amber-700 transition font-medium"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl shadow-xl mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              className="border border-gray-300 dark:border-gray-700 p-4 rounded-2xl dark:bg-[#2a2a2a] dark:text-white focus:border-primary outline-none"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <textarea
              className="border border-gray-300 dark:border-gray-700 p-4 rounded-2xl dark:bg-[#2a2a2a] dark:text-white focus:border-primary outline-none h-28"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                className="border border-gray-300 dark:border-gray-700 p-4 rounded-2xl dark:bg-[#2a2a2a] dark:text-white focus:border-primary outline-none"
                placeholder="Price ₹"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <input
                type="number"
                className="border border-gray-300 dark:border-gray-700 p-4 rounded-2xl dark:bg-[#2a2a2a] dark:text-white focus:border-primary outline-none"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
              />
            </div>

            <select
              className="border border-gray-300 dark:border-gray-700 p-4 rounded-2xl dark:bg-[#2a2a2a] dark:text-white focus:border-primary outline-none"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="candles">Candles</option>
              <option value="crochet">Crochet</option>
            </select>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="border border-gray-300 dark:border-gray-700 p-4 rounded-2xl dark:bg-[#2a2a2a] dark:text-white"
            />

            <button
              type="submit"
              className="bg-primary text-white py-4 rounded-2xl font-medium hover:bg-amber-700 transition mt-2"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* OPTIMIZED PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full"
          >
            {/* Image Container - Fixed Height & Alignment */}
            <div className="relative h-56 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
              <img
                src={
                  p.images?.[0]
                    ? `${BASE_URL}${p.images[0]}`
                    : "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={p.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>

            {/* Content - Perfect Alignment */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-semibold text-lg line-clamp-2 heading-font text-gray-900 dark:text-white">
                {p.title}
              </h3>

              <p className="text-primary font-bold text-2xl mt-2">₹{p.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Stock: {p.stock}
              </p>

              <div className="flex gap-3 mt-auto pt-6">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 py-3 rounded-2xl transition font-medium"
                >
                  <Pencil size={18} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 py-3 rounded-2xl transition font-medium"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
