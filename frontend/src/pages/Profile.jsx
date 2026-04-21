import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { BASE_URL } from "../config";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders] = useState([]);
  const navigate = useNavigate();

  const { items: wishlist } = useSelector(
    (state) => state.wishlist || { items: [] },
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out ✨");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="text-center py-32 text-gray-600 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft dark:bg-[#121212] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-12">
          {/* PROFILE */}
          <div className="flex flex-col items-center mb-10 sm:mb-12">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center text-5xl sm:text-7xl mb-4 sm:mb-6">
              <i className="fa-solid fa-user text-primary"></i>
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold text-primary">
              {user.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {user.email}
            </p>
          </div>

          {/* ORDERS */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-white">
              Order History
            </h2>

            {orders.length === 0 ? (
              <div className="bg-soft dark:bg-gray-700 p-6 sm:p-10 rounded-2xl text-center">
                <p className="text-gray-500 dark:text-gray-300">
                  You haven't placed any orders yet.
                </p>

                <Link
                  to="/shop"
                  className="text-primary hover:underline mt-4 inline-block"
                >
                  Start shopping →
                </Link>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                Orders will appear here.
              </p>
            )}
          </div>

          {/* WISHLIST */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-white">
              Wishlist ❤️ ({wishlist.length}/500)
            </h2>

            {wishlist.length === 0 ? (
              <div className="bg-soft dark:bg-gray-700 p-6 sm:p-10 rounded-2xl text-center">
                <p className="text-gray-500 dark:text-gray-300">No items yet</p>

                <Link
                  to="/shop"
                  className="text-primary hover:underline mt-4 inline-block"
                >
                  Browse →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {wishlist.map((item) => (
                  <Link key={item._id} to={`/product/${item._id}`}>
                    <div className="bg-white dark:bg-gray-700 p-3 sm:p-4 rounded-2xl shadow hover:shadow-lg transition group">
                      {/* IMAGE */}
                      <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 h-40 sm:h-48">
                        <img
                          src={
                            item.images?.[0]
                              ? `${BASE_URL}${item.images[0]}`
                              : "https://via.placeholder.com/300"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      <p className="mt-2 text-xs sm:text-sm font-medium line-clamp-2 text-gray-800 dark:text-gray-200">
                        {item.title}
                      </p>

                      <p className="text-primary font-bold text-sm sm:text-base">
                        ₹{item.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* LOGOUT */}
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="px-6 sm:px-10 py-3 sm:py-4 border-2 border-red-500 text-red-600 rounded-3xl hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
