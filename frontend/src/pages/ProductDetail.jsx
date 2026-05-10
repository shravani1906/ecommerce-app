import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import { Heart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i._id === id),
  );

  const wishlist = useSelector((state) => state.wishlist.items);

  const qty = cartItem ? cartItem.quantity : 0;
  const isWishlisted = wishlist.some((i) => i._id === id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-app-zwoc.onrender.com/api/products/${id}`,
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err.message);
        toast.error("Product not found or server error");
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-soft dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/shop" className="text-primary hover:underline">
          ← Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10 mt-8">
          {/* Image Section */}
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-3xl shadow">
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]} // ← Direct Cloudinary URL
                  alt={product.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl opacity-50">
                  {product.category === "candles" ? "🕯️" : "🧶"}
                </div>
              )}
            </div>

            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className="absolute top-8 right-8 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <Heart
                className={`w-6 h-6 transition ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold heading-font">{product.title}</h1>

            <p className="text-3xl font-semibold text-primary">
              ₹{product.price}
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Add to Cart Section */}
            {qty === 0 ? (
              <button
                onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                className="w-full py-4 bg-primary hover:bg-amber-700 text-white rounded-2xl font-medium text-lg transition"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl">
                <button
                  onClick={() => dispatch(decreaseQty(id))}
                  className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
                >
                  −
                </button>
                <span className="text-2xl font-semibold">{qty}</span>
                <button
                  onClick={() => dispatch(increaseQty(id))}
                  className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
