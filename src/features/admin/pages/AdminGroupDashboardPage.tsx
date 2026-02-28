import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSnapshotsByGroup } from "../services";

export default function AdminGroupDashboardPage() {
  const { groupId } = useParams();
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      loadSnapshots(Number(groupId));
    }
  }, [groupId]);

  const loadSnapshots = async (id: number) => {
    try {
      const data = await getSnapshotsByGroup(id);
      setSnapshots(data);
    } catch (error) {
      console.error("Failed to load snapshots", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Group {groupId} Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Label</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Captured</th>
            </tr>
          </thead>

          <tbody>
            {snapshots.map((snap) => (
              <tr key={snap.snapshotId} className="border-t">
                <td className="p-3">{snap.label}</td>
                <td className="p-3">{snap.syncRun.projectName}</td>
                <td className="p-3">{snap.syncRun.runStatus}</td>
                <td className="p-3">
                  {new Date(snap.capturedAt).toLocaleString()}
                </td>
              </tr>
            ))}

            {snapshots.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No snapshots found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
