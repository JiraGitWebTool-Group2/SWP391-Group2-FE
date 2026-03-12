import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIntegratedGroups, startSync } from "../services";

import SyncForm from "../components/SyncForm";
import type { IntegratedGroup, CreateSyncRunRequest } from "../types";
import { toast } from "sonner";

export default function SyncPage() {
  const [groups, setGroups] = useState<IntegratedGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IntegratedGroup | null>(
    null,
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getIntegratedGroups();
        setGroups(data);
      } catch (err) {
        console.error(err);
        toast.error("Không tải được danh sách group");
      }
    };

    fetchGroups();
  }, []);

  const handleStartSync = async (
    payload: Omit<CreateSyncRunRequest, "projectId">,
  ) => {
    if (!selectedGroup) return;

    try {
      const res = await startSync({
        ...payload,
        projectId: selectedGroup.projectId,
      });

      toast.success("Sync started");

      navigate(`/sync-result/${res.syncRunId}`);
    } catch (err) {
      console.error(err);
      toast.error("Start sync failed");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      {/* Select Group */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Group</label>

        <select
          className="w-full border rounded-lg p-2"
          onChange={(e) => {
            const group = groups.find(
              (g) => g.groupId === Number(e.target.value),
            );
            setSelectedGroup(group || null);
          }}
        >
          <option value="">Choose group</option>

          {groups.map((g) => (
            <option key={g.groupId} value={g.groupId}>
              {g.groupName} - {g.projectName}
            </option>
          ))}
        </select>
      </div>

      {/* Sync Form */}
      {selectedGroup && <SyncForm onSubmit={handleStartSync} />}
    </div>
  );
}
