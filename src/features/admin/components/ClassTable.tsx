import type { Class, AllLecturer } from "../types";

interface Props {
  classCode?: Class[];
  lecturers?: AllLecturer[];
  onDelete: (id: number) => void;
  onEdit: (c: Class) => void;
  onView: (id: number) => void;
}

export default function ClassTable({
  classCode = [],
  lecturers = [],
  onDelete,
  onEdit,
  onView,
}: Props) {
  const lecturerMap: Record<number, string> = Object.fromEntries(
    lecturers.map((l) => [l.lecturerId, l.fullName]),
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "PLANNING":
        return "bg-blue-100 text-blue-700";
      case "INACTIVE":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        {/* HEADER */}

        <thead className="border-b bg-slate-50">
          <tr>
            <th className="text-left px-6 py-3 font-semibold text-slate-600">
              Class Code
            </th>

            <th className="text-left px-6 py-3 font-semibold text-slate-600">
              Lecturer
            </th>

            <th className="text-left px-6 py-3 font-semibold text-slate-600">
              Status
            </th>

            <th className="text-left px-6 py-3 font-semibold text-slate-600">
              Actions
            </th>

            <th className="text-left px-6 py-3 font-semibold text-slate-600">
              View Detail
            </th>
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {classCode.map((c) => {
            const lecturerName =
              c.lecturerUserId && lecturerMap[c.lecturerUserId]
                ? lecturerMap[c.lecturerUserId]
                : null;

            return (
              <tr
                key={c.classId}
                className="border-b hover:bg-slate-50 transition"
              >
                {/* CLASS CODE */}

                <td className="px-6 py-4 font-medium text-slate-800">
                  {c.classCode}
                </td>

                {/* LECTURER */}

                <td className="px-6 py-4">
                  {lecturerName ? (
                    <span className="text-slate-700">{lecturerName}</span>
                  ) : (
                    <span className="text-gray-400 italic">Not Assigned</span>
                  )}
                </td>

                {/* STATUS */}

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                      c.status || "",
                    )}`}
                  >
                    {c.status}
                  </span>
                </td>

                {/* ACTIONS */}

                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => onEdit(c)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(c.classId)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>

                {/* VIEW DETAIL */}

                <td className="px-6 py-4">
                  <button
                    onClick={() => onView(c.classId)}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            );
          })}

          {/* EMPTY */}

          {classCode.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-500">
                No classes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
