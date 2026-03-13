import { api } from "@/lib/axios";
import type {
  Class,
  CreateSyncRunRequest,
  IntegratedGroup,
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

export const getIntegratedGroups = async (): Promise<IntegratedGroup[]> => {
  const res = await api.get("/groups/integrated");
  return res.data;
};

export const classService = {
  getClassesOfLecturer: async (lecturerId: number): Promise<Class[]> => {
    const res = await api.get(`/lecturers/${lecturerId}/classes`);
    return res.data;
  },
};
