import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { BASE_URL } from "../config";
export default function Returns() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [mode, setMode] = useState("chat");
  const [requestType, setRequestType] = useState("return");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const delivered = res.data.filter(
        (order) => order.status === "Delivered",
      );

      setOrders(delivered);
    } catch (err) {
      console.error("FETCH ERROR:", err.response || err);
      toast.error("Failed to load orders");
    }
  };

  const handleSubmit = () => {
    if (!selectedOrder) return toast.error("Select an order first");
    if (!reason) return toast.error("Select reason");

    toast.success(
      `${requestType === "return" ? "Return" : "Exchange"} submitted`,
    );

    setSelectedOrder(null);
    setReason("");
    setRequestType("return");
  };

  return (
    <div className="min-h-screen bg-soft dark:bg-[#121212] px-4 py-10 transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border dark:border-gray-700">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Returns & Exchanges
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Select an order and raise a request easily
          </p>
        </div>

        {/* ORDERS */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Your Delivered Orders
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              No delivered orders found
            </div>
          ) : (
            <div className="grid gap-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-2xl border cursor-pointer transition hover:shadow-md ${
                    selectedOrder?._id === order._id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {order.items?.[0]?.title || "Product"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ₹{order.totalAmount}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* REQUEST FORM */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Request Return / Exchange
          </h2>

          {selectedOrder && (
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Selected:{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {selectedOrder.items?.[0]?.title}
              </span>
            </div>
          )}

          <select
            className="w-full p-3 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select reason</option>
            <option value="damaged">Damaged</option>
            <option value="wrong_item">Wrong item</option>
            <option value="not_as_described">Not as described</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-amber-700 text-white py-3 rounded-2xl font-medium transition"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
