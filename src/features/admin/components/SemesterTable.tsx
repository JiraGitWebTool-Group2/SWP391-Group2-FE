import type { Semester } from "../types";

interface Props {
  semesters: Semester[];
  onClickSemester: (id: number) => void;
  onDeleteSemester: (id: number) => void;
  onEditSemester: (semester: Semester) => void;
}

export default function SemesterTable({
  semesters,
  onClickSemester,
  onDeleteSemester,
  onEditSemester,
}: Props) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <div className="bg-white border rounded shadow">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="text-left p-4">Code</th>
            <th className="text-left p-4">Semester</th>
            <th className="text-left p-4">Start Date</th>
            <th className="text-left p-4">End Date</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {semesters.map((s) => (
            <tr key={s.semesterId} className="border-b hover:bg-gray-50">
              <td className="p-4 cursor-pointer">{s.code}</td>
              <td className="p-4 cursor-pointer">{s.name}</td>
              <td className="p-4 cursor-pointer">{formatDate(s.startDate)}</td>
              <td className="p-4 cursor-pointer">{formatDate(s.endDate)}</td>
              <td className="p-4 cursor-pointer">{s.status}</td>

              <td className="p-4 flex gap-3">
                <button
                  onClick={() => onEditSemester(s)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDeleteSemester(s.semesterId)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>

                <button
                  onClick={() => onClickSemester(s.semesterId)}
                  className="text-blue-600 hover:underline"
                >
                  Classes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
