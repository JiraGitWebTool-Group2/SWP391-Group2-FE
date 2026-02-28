import { api } from "@/lib/axios";
import type { DashboardResponse } from "./types";

export const getDashboard = async (
  groupId: number,
): Promise<DashboardResponse> => {
  const res = await api.get(`/groups/${groupId}/dashboard`);
  return res.data;
};
