import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Flame,
  Heart,
  ChevronDown,
  Truck,
  ShieldCheck,
  Gift,
} from "lucide-react";

import { BASE_URL } from "../config";

export default function Home() {
  const [products, setProducts] = useState([]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data || []);
      } catch (err) {
        console.error("API ERROR:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryProduct = (category) =>
    products.find((p) => p.category === category);

  return (
    <div className="min-h-screen bg-soft dark:bg-[#121212] transition-colors duration-300">
      {/* HERO (UNCHANGED) */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-orange-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fbbf24_0%,transparent_70%)] opacity-30 animate-pulse"></div>

        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-amber-400/20 blur-3xl rounded-full top-10 left-5 sm:left-10 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute w-48 h-48 sm:h-72 sm:w-72 bg-orange-400/20 blur-3xl rounded-full bottom-10 right-5 sm:right-10 animate-[float_8s_ease-in-out_infinite]"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <Flame className="w-16 h-16 sm:w-24 sm:h-24 text-amber-300 mx-auto mb-4 animate-pulse" />

          <h1 className="heading-font text-4xl sm:text-6xl md:text-8xl text-white mb-4">
            Wick & Weave
          </h1>

          <p className="text-lg sm:text-2xl text-amber-100 mb-8">
            Handcrafted candles that glow with warmth <br />
            and crochet made with threads of love
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-4 bg-white text-primary rounded-3xl font-semibold"
            >
              Shop Now
            </Link>

            <Link
              to="/shop"
              className="px-8 py-4 border-2 border-white/70 text-white rounded-3xl font-semibold"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
      >
        <ChevronDown className="w-9 h-9" />
      </button>

      {/* TRUST BAR */}
      <div className="bg-card py-6 border-b">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm">
          {[
            { icon: Truck, text: "Free Shipping" },
            { icon: ShieldCheck, text: "Secure Payments" },
            { icon: Gift, text: "Perfect Gifts" },
            { icon: Heart, text: "Handmade Love" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <item.icon className="w-6 h-6 text-primary" />
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl text-primary mb-3">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {["candles", "crochet"].map((cat) => {
            const product = getCategoryProduct(cat);

            return (
              <Link key={cat} to={`/shop?category=${cat}`}>
                <div className="bg-card rounded-3xl overflow-hidden">
                  <div className="h-52 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    {product?.images?.[0] ? (
                      <img
                        src={`${BASE_URL}${product.images[0]}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "No product"
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl capitalize">{cat}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FIXED MARQUEE */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max gap-6 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...products, ...products].map((product, i) => (
            <Link
              key={`${product._id}-${i}`}
              to={`/product/${product._id}`}
              className="min-w-[260px] flex-shrink-0 bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden"
            >
              <div className="h-48">
                <img
                  src={
                    product.images?.[0]
                      ? `${BASE_URL}${product.images[0]}`
                      : "https://via.placeholder.com/300"
                  }
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <p>{product.title}</p>
                <p className="text-primary">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* CTA */}
      <div className="bg-primary text-white text-center py-16">
        <h2 className="text-3xl mb-4">Bring warmth to your home</h2>
        <Link
          to="/shop"
          className="px-10 py-4 bg-white text-primary rounded-3xl"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
