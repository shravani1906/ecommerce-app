import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { addToCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { ChevronDown } from "lucide-react";

import { BASE_URL } from "../config";
export default function Shop() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );

  const [priceRange, setPriceRange] = useState("all");
  const [sortOption, setSortOption] = useState("latest");
  const [loading, setLoading] = useState(true);

  const [openFilters, setOpenFilters] = useState(false);

  const getCartQty = (id) => {
    const item = cartItems.find((i) => i._id === id);
    return item ? item.quantity : 0;
  };

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}/api/products`);

      let data = Array.isArray(res.data) ? res.data : res.data?.products || [];

      if (searchTerm.trim()) {
        data = data.filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      if (selectedCategory !== "all") {
        data = data.filter((p) => p.category === selectedCategory);
      }

      if (priceRange === "low")
        data = data.filter((p) => Number(p.price) < 400);

      if (priceRange === "mid")
        data = data.filter(
          (p) => Number(p.price) >= 400 && Number(p.price) <= 700,
        );

      if (priceRange === "high")
        data = data.filter((p) => Number(p.price) > 700);

      if (sortOption === "lowToHigh")
        data.sort((a, b) => Number(a.price) - Number(b.price));

      if (sortOption === "highToLow")
        data.sort((a, b) => Number(b.price) - Number(a.price));

      if (sortOption === "latest")
        data.sort(
          (a, b) =>
            new Date(b.createdAt || Date.now()) -
            new Date(a.createdAt || Date.now()),
        );

      setProducts(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, priceRange, sortOption]);

  useEffect(() => {
    setSearchParams({
      ...(searchTerm && { search: searchTerm }),
      ...(selectedCategory !== "all" && { category: selectedCategory }),
    });
  }, [searchTerm, selectedCategory]);

  const handleAdd = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`Added ${product.title}`);
  };

  return (
    <div className="min-h-screen bg-soft py-6 md:py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* FILTERS */}
        <div className="w-full md:w-64">
          <button
            onClick={() => setOpenFilters(!openFilters)}
            className="w-full flex items-center justify-between bg-card px-4 py-3 rounded-2xl"
          >
            <span className="font-semibold">Filters</span>
            <ChevronDown
              className={`transition-transform ${
                openFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          {openFilters && (
            <div className="mt-3 bg-card p-4 rounded-2xl space-y-5">
              <div>
                <p className="font-medium mb-2">Category</p>
                {["all", "candles", "crochet"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left p-2 rounded-xl ${
                      selectedCategory === cat ? "bg-primary text-white" : ""
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div>
                <p className="font-medium mb-2">Price</p>
                {["all", "low", "mid", "high"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setPriceRange(r)}
                    className={`block w-full text-left p-2 rounded-xl ${
                      priceRange === r ? "bg-primary text-white" : ""
                    }`}
                  >
                    {r === "all" && "All"}
                    {r === "low" && "Under ₹400"}
                    {r === "mid" && "₹400 - ₹700"}
                    {r === "high" && "Above ₹700"}
                  </button>
                ))}
              </div>

              <div>
                <p className="font-medium mb-2">Sort</p>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full p-2 rounded-xl border bg-white dark:bg-gray-900"
                >
                  <option value="latest">Newest</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* PRODUCTS */}
        <div className="flex-1">
          <input
            className="w-full mb-4 p-3 border rounded-xl"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => {
                const qty = getCartQty(product._id);

                return (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="bg-card rounded-2xl p-3"
                  >
                    <div className="h-48 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={
                          product.images?.[0]
                            ? `${BASE_URL}${product.images[0]}`
                            : "https://via.placeholder.com/300"
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="mt-2 font-semibold">{product.title}</h3>

                    <p className="text-primary font-bold">₹{product.price}</p>

                    {qty === 0 ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAdd(product);
                        }}
                        className="w-full mt-3 bg-primary text-white py-2 rounded-xl"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div
                        onClick={(e) => e.preventDefault()}
                        className="flex justify-between mt-3"
                      >
                        <button
                          onClick={() => dispatch(decreaseQty(product._id))}
                        >
                          -
                        </button>
                        <span>{qty}</span>
                        <button
                          onClick={() => dispatch(increaseQty(product._id))}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
