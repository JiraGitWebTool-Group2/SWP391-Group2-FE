import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
        {/* 404 Big Text */}
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
