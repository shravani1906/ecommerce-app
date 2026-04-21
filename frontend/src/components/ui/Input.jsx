export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary transition"
        {...props}
      />
    </div>
  );
}
