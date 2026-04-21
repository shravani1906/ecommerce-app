import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import { Heart } from "lucide-react";

import { BASE_URL } from "../config";

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
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err.message);
        toast.error("Backend not reachable");
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-soft dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/shop">← Back</Link>

        <div className="grid md:grid-cols-2 gap-10 mt-6">
          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl">
            <img
              src={
                product.images?.[0]
                  ? `${BASE_URL}${product.images[0]}`
                  : "https://via.placeholder.com/400"
              }
              className="w-full h-[400px] object-contain"
            />

            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className="absolute top-3 right-3 bg-white p-2 rounded-full"
            >
              <Heart
                className={
                  isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
                }
              />
            </button>
          </div>

          <div>
            <h1 className="text-3xl">{product.title}</h1>
            <p className="text-xl text-primary mt-2">₹{product.price}</p>
            <p className="mt-4">{product.description}</p>

            {qty === 0 ? (
              <button
                onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                className="w-full mt-6 bg-primary text-white py-3 rounded-xl"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex justify-between mt-6 bg-gray-100 p-3 rounded-xl">
                <button onClick={() => dispatch(decreaseQty(id))}>-</button>
                <span>{qty}</span>
                <button onClick={() => dispatch(increaseQty(id))}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
