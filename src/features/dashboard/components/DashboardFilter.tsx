export default function DashboardFilter() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard Filters
        </h2>
        <p className="text-sm text-gray-500">
          Filter and search your SRS documents
        </p>
      </div>

      {/* Filter Fields */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Status</label>
          <select className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
            <option>All Status</option>
            <option>Draft</option>
            <option>Reviewing</option>
            <option>Approved</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Created Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
          Reset
        </button>

        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
