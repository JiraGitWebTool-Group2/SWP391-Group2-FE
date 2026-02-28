// src/features/sync/pages/SyncPage.tsx

import SyncForm from "../components/SyncForm";
import { startSync } from "../services";
import type { CreateSyncRunRequest } from "../types";

export default function SyncPage() {
  const handleStartSync = async (payload: CreateSyncRunRequest) => {
    const res = await startSync(payload);
    alert(`Sync started. Run ID: ${res.syncRunId}`);
  };

  return <SyncForm onSubmit={handleStartSync} />;
}
