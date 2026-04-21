import { Link } from "react-router-dom";
import { Flame, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card text-text mt-auto border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* TOP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-4 gap-10 text-sm">
        {/* BRAND */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-primary" />
            <span className="heading-font text-xl font-semibold">
              Wick & Weave
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
            Handmade candles & crochet crafted with love and warmth for your
            space.
          </p>

          <div className="flex items-center gap-2 text-primary text-xs">
            <Heart className="w-4 h-4" />
            <span>Made with love in India</span>
          </div>

          <p className="text-[15px] text-gray-400 mt-3 leading-snug">
            *This website is created for academic purposes only*.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
            <Link to="/shop" className="hover:text-primary transition">
              All Products
            </Link>
            <Link
              to="/shop?category=candles"
              className="hover:text-primary transition"
            >
              Candles
            </Link>
            <Link
              to="/shop?category=crochet"
              className="hover:text-primary transition"
            >
              Crochet
            </Link>
          </div>
        </div>

        {/* HELP */}
        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
            <Link to="/contact" className="hover:text-primary transition">
              Contact Us
            </Link>

            <Link to="/shipping" className="hover:text-primary transition">
              Shipping Policy
            </Link>

            <Link to="/returns" className="hover:text-primary transition">
              Returns & Refunds
            </Link>

            <Link to="/testimonials" className="hover:text-primary transition">
              Testimonials
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-4">Get in Touch</h4>

          <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>hello@wickandweave.com</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-brands fa-instagram text-primary text-base"></i>
              <span>@wickandweave</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-200 dark:border-gray-800 text-center py-5 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Wick & Weave • All rights reserved
      </div>
    </footer>
  );
}
