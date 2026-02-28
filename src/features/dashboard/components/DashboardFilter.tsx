import { useState } from "react";

export interface DashboardFilterValues {
  search: string;
  status: string;
  createdDate: string;
}

interface Props {
  onApply: (filters: DashboardFilterValues) => void;
}

export default function DashboardFilter({ onApply }: Props) {
  const [filters, setFilters] = useState<DashboardFilterValues>({
    search: "",
    status: "All Status",
    createdDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    const resetValues = {
      search: "",
      status: "All Status",
      createdDate: "",
    };
    setFilters(resetValues);
    onApply(resetValues);
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard Filters
        </h2>
        <p className="text-sm text-gray-500">
          Filter and search your SRS documents
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Search</label>
          <input
            name="search"
            type="text"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by name..."
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
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
            name="createdDate"
            type="date"
            value={filters.createdDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Reset
        </button>

        <button
          onClick={handleApply}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
