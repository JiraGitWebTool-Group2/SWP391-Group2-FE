export default function ReportManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Report Management</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Create Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Group</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <ReportRow />
            <ReportRow />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportRow() {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 font-medium">Sprint 1</td>
      <td className="px-6 py-4">Group A</td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
          Completed
        </span>
      </td>
      <td className="px-6 py-4">2026-02-25</td>
      <td className="px-6 py-4 text-right space-x-3">
        <button className="text-blue-600 hover:underline">View</button>
        <button className="text-yellow-600 hover:underline">Edit</button>
      </td>
    </tr>
  );
}
