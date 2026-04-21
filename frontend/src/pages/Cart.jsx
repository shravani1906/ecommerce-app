import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/cartSlice";

import toast from "react-hot-toast";
import { Trash2, ArrowLeft, ShoppingBag, Plus, Minus } from "lucide-react";

import { BASE_URL } from "../config";

export default function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed");
  };

  const handleIncrease = (id) => {
    dispatch(increaseQty(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQty(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-soft dark:bg-[#121212]">
        <ShoppingBag className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />

        <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 dark:text-white">
          Your cart is empty
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Add some cozy items to get started ✨
        </p>

        <Link
          to="/shop"
          className="mt-6 px-6 py-3 bg-primary text-white rounded-2xl"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/shop">
              <ArrowLeft />
            </Link>

            <h1 className="text-3xl font-semibold">Cart ({items.length})</h1>
          </div>

          <button onClick={handleClear} className="text-red-500 text-sm">
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-[#1e1e1e] p-4 rounded-2xl flex gap-4"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                  {item.images?.[0] ? (
                    <img
                      src={`${BASE_URL}${item.images[0]}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-2xl">
                      {item.category === "candles" ? "🕯️" : "🧶"}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => handleDecrease(item._id)}>
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => handleIncrease(item._id)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between mt-3">
                    <p className="font-bold">₹{item.price * item.quantity}</p>

                    <button onClick={() => handleRemove(item._id)}>
                      <Trash2 className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center mt-6 bg-primary text-white py-3 rounded-2xl"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
