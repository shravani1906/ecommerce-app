import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-soft flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-10">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-8 py-4 bg-primary text-white rounded-3xl font-medium hover:bg-amber-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
