export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
