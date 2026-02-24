import GroupTable from "../components/GroupTable";

export default function GroupManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Group Management</h1>
      <GroupTable />
    </div>
  );
}
