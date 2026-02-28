// src/features/sync/services.ts

import { api } from "@/lib/axios";
import type { CreateSyncRunRequest, StartSyncResponse } from "./types";

export const startSync = async (
  payload: CreateSyncRunRequest,
): Promise<StartSyncResponse> => {
  const res = await api.post("/sync-runs", payload);
  return res.data;
};
