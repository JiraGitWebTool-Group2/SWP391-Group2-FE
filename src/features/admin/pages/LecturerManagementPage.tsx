import LecturerTable from "../components/LecturerTable";

export default function LecturerManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lecturer Management</h1>
      <LecturerTable />
    </div>
  );
}
