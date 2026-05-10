import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { clearCart } from "../redux/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!items.length) {
      toast.error("Cart is empty");
      return;
    }

    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.pincode
    ) {
      toast.error("Please fill all shipping details");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        items: items.map((item) => ({
          product: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: total,
        shippingAddress,
      };

      // Try to send order (demo mode)
      await axios.post(
        "https://ecommerce-app-zwoc.onrender.com/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Order placed successfully! 🎉");
    } catch (err) {
      console.log("Order API error (demo mode):", err.message);
      toast.success("Order placed successfully! 🎉 (Demo Mode)");
    }

    dispatch(clearCart());
    navigate("/profile");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-soft dark:bg-[#121212] py-10 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-font text-4xl text-primary mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SHIPPING FORM */}
          <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-8 rounded-3xl shadow">
            <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

            <div className="space-y-5">
              <input
                name="name"
                placeholder="Full Name"
                value={shippingAddress.name}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#2a2a2a]"
                required
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#2a2a2a]"
                required
              />

              <input
                name="address"
                placeholder="Full Address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#2a2a2a]"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="city"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#2a2a2a]"
                />

                <input
                  name="state"
                  placeholder="State"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#2a2a2a]"
                />
              </div>

              <input
                name="pincode"
                placeholder="Pincode"
                value={shippingAddress.pincode}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#2a2a2a]"
                required
              />
            </div>
          </div>

          {/* ORDER SUMMARY WITH IMAGES */}
          <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-8 rounded-3xl shadow h-fit">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto">
              {items.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]} // ← Direct Cloudinary URL
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-3xl">
                        {item.category === "candles" ? "🕯️" : "🧶"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium leading-tight">{item.title}</h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-semibold hover:bg-amber-700 transition disabled:opacity-70"
            >
              {loading ? "Processing Order..." : "Place Order"}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Demo Mode • Orders not saved to database yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
