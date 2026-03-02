import { api } from "@/lib/axios";
import type {
  CreateSyncRunRequest,
  StartSyncResponse,
  SyncRunDetail,
} from "./types";

export const startSync = async (
  payload: CreateSyncRunRequest,
): Promise<StartSyncResponse> => {
  const res = await api.post("/sync-runs", payload);
  return res.data;
};

export const getSyncRun = async (syncRunId: number): Promise<SyncRunDetail> => {
  const res = await api.get(`/sync-runs/${syncRunId}`);
  return res.data;
};
