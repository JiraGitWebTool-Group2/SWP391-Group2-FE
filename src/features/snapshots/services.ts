import { api } from "@/lib/axios";
import type { CommitDTO, RepoSummaryDTO, DailySummaryDTO } from "./types";

export const getSnapshotCommits = async (
  snapshotId: number,
): Promise<CommitDTO[]> => {
  const res = await api.get(`/snapshots/${snapshotId}/commits`);
  return res.data;
};

export const getSnapshotRepoSummary = async (
  snapshotId: number,
): Promise<RepoSummaryDTO[]> => {
  const res = await api.get(`/snapshots/${snapshotId}/repos-summary`);
  return res.data;
};

export const getSnapshotDailySummary = async (
  snapshotId: number,
): Promise<DailySummaryDTO[]> => {
  const res = await api.get(`/snapshots/${snapshotId}/daily-summary`);
  return res.data;
};
