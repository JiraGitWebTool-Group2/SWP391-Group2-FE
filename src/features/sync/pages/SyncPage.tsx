import { useProjectStore } from "@/stores/project.store";
import { useNavigate } from "react-router-dom";
import SyncForm from "../components/SyncForm";
import type { CreateSyncRunRequest } from "../types";
import { startSync } from "../services";

export default function SyncPage() {
  const navigate = useNavigate();
  const projectId = useProjectStore((s) => s.currentProjectId);

  if (!projectId) {
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        No project selected
      </div>
    );
  }

  const handleStart = async (
    payload: Omit<CreateSyncRunRequest, "projectId">,
  ) => {
    try {
      const res = await startSync({
        ...payload,
        projectId,
      });

      navigate(`/sync-result/${res.syncRunId}`);
    } catch (err) {
      console.error(err);
      alert("Start sync failed");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 border">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Start Sync for Project #{projectId}
        </h1>

        <SyncForm onSubmit={handleStart} />
      </div>
    </div>
  );
}
