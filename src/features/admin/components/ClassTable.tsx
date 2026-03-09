import type { Class, AllLecturer } from "../types";

interface Props {
  classes: Class[];
  lecturers: AllLecturer[];
  onDelete: (id: number) => void;
  onEdit: (c: Class) => void;
  onView: (id: number) => void;
}

export default function ClassTable({
  classes,
  lecturers,
  onDelete,
  onEdit,
  onView,
}: Props) {
  /* ================= LECTURER MAP ================= */

  const lecturerMap: Record<number, string> = Object.fromEntries(
    lecturers.map((l) => [l.lecturerId, l.fullName]),
  );

  /* ================= UI ================= */

  return (
    <div className="bg-white border rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        {/* HEADER */}

        <thead className="border-b bg-gray-50">
          <tr>
            <th className="text-left p-4 font-semibold">Class</th>
            <th className="text-left p-4 font-semibold">Course Code</th>
            <th className="text-left p-4 font-semibold">Lecturer</th>
            <th className="text-left p-4 font-semibold">Status</th>
            <th className="text-left p-4 font-semibold">Actions</th>
            <th className="text-left p-4 font-semibold">View Detail</th>
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {classes.map((c) => {
            const lecturerName =
              c.lecturerUserId && lecturerMap[c.lecturerUserId]
                ? lecturerMap[c.lecturerUserId]
                : null;

            return (
              <tr
                key={c.classId}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* CLASS NAME */}

                <td className="p-4 font-medium">{c.className}</td>

                {/* COURSE CODE */}

                <td className="p-4 text-gray-600">{c.courseCode}</td>

                {/* LECTURER */}

                <td className="p-4">
                  {lecturerName ? (
                    <span>{lecturerName}</span>
                  ) : (
                    <span className="text-gray-400 italic">Not Assigned</span>
                  )}
                </td>

                {/* STATUS */}

                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-gray-100 text-sm">
                    {c.status}
                  </span>
                </td>

                {/* ACTIONS */}

                <td className="p-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => onEdit(c)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(c.classId)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>

                {/* VIEW DETAIL */}

                <td className="p-4">
                  <button
                    onClick={() => onView(c.classId)}
                    className="text-green-600 hover:underline"
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            );
          })}

          {classes.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-6 text-gray-500">
                No classes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
