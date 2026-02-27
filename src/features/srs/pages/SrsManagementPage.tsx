import { Link } from "react-router-dom";

interface SrsDocument {
  id: string;
  title: string;
  version: string;
  status: string;
}

export default function SrsManagementPage() {
  const documents: SrsDocument[] = [
    { id: "1", title: "SRS Group 1", version: "1.0", status: "Draft" },
    { id: "2", title: "SRS Group 2", version: "1.1", status: "Submitted" },
    { id: "3", title: "SRS Group 3", version: "2.0", status: "Approved" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">SRS Management</h1>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th>Version</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b">
                <td className="py-2">{doc.title}</td>
                <td>{doc.version}</td>
                <td>{doc.status}</td>
                <td className="space-x-3">
                  <Link
                    to={`/srs/${doc.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/srs/review/${doc.id}`}
                    className="text-green-600 hover:underline"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
