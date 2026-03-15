import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getIntegratedGroups, startSync, getMyGroup } from "../services";
import SyncForm from "../components/SyncForm";

import type { IntegratedGroup, CreateSyncRunRequest, MyGroup } from "../types";

import { toast } from "sonner";

export default function SyncPage() {
  const [groups, setGroups] = useState<IntegratedGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<IntegratedGroup[]>([]);

  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  const [selectedGroup, setSelectedGroup] = useState<IntegratedGroup | null>(
    null,
  );
  const [myGroup, setMyGroup] = useState<MyGroup | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const group = await getMyGroup();

        setMyGroup(group);

        setSelectedGroup({
          groupId: group.groupId,
          groupName: group.groupName,
          projectId: group.groupId,
          projectName: "",
          classId: 0,
          className: "",
        });
      } catch {
        const data = await getIntegratedGroups();
        setGroups(data);

        const uniqueClasses = [
          ...new Map(
            data.map((g) => [
              g.classId,
              { classId: g.classId, className: g.className },
            ]),
          ).values(),
        ];

        setClasses(uniqueClasses);
      }
    };

    fetchData();
  }, []);

  const handleClassChange = (classId: number | null) => {
    setSelectedClass(classId);
    setSelectedGroup(null);

    if (!classId) {
      setFilteredGroups([]);
      return;
    }

    const list = groups.filter((g) => g.classId === classId);
    setFilteredGroups(list);
  };

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

  // Lấy danh sách class unique
  const classes = Array.from(
    new Map(groups.map((g) => [g.classId, g])).values(),
  );

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-6">
      {/* SELECT CLASS */}
      <div>
        <label className="block mb-2 font-medium">Select Class</label>

        <select
          className="w-full border rounded-lg p-2"
          onChange={(e) =>
            handleClassChange(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Choose class</option>

          {classes.map((c) => (
            <option key={c.classId} value={c.classId}>
              {c.classCode}
            </option>
          ))}
        </select>
      </div>

      {/* SELECT GROUP */}
      {selectedClass && (
        <div>
          <label className="block mb-2 font-medium">Select Group</label>

          <select
            className="w-full border rounded-lg p-2"
            onChange={(e) => {
              const group = filteredGroups.find(
                (g) => g.groupId === Number(e.target.value),
              );

              setSelectedGroup(group || null);
            }}
          >
            <option value="">Choose group</option>

            {filteredGroups.map((g) => (
              <option key={g.groupId} value={g.groupId}>
                {g.groupName} - {g.projectName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* SYNC FORM */}
      {selectedGroup && (
        <SyncForm
          integrations={selectedGroup.integrations}
          onSubmit={handleStartSync}
        />
      )}
    </div>
  );
}
