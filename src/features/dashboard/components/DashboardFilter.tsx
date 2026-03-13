import { useEffect, useState } from "react";
import { getSnapshots } from "../services";
import type { Snapshot } from "../types";

interface Props {
  projectId: number;
  onSelectSnapshot: (id: number) => void;
}

export default function DashboardFilter({
  projectId,
  onSelectSnapshot,
}: Props) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);

  useEffect(() => {
    loadSnapshots();
  }, [projectId]);

  const loadSnapshots = async () => {
    try {
      const data = await getSnapshots(projectId);
      setSnapshots(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <select
      className="border rounded px-3 py-2"
      onChange={(e) => onSelectSnapshot(Number(e.target.value))}
    >
      <option value="">Select snapshot</option>

      {snapshots.map((s) => (
        <option key={s.snapshotId} value={s.snapshotId}>
          {new Date(s.capturedAt).toLocaleString()}
        </option>
      ))}
    </select>
  );
}
