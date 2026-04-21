import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Extra strict protection for Admin - only you can access
  if (adminOnly) {
    const enteredKey = prompt(
      "Enter your secret Admin Key to access your private workspace:",
    );

    if (enteredKey !== "shravani123456") {
      // ← Change this to your own strong secret
      alert("Access Denied. This is Shravani's private workspace only.");
      return <Navigate to="/shop" replace />;
    }
  }

  return children;
}
