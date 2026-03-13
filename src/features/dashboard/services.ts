import { api } from "@/lib/axios";
import type {
  Snapshot,
  Summary,
  TaskProgress,
  Commit,
  RepoSummary,
  DailySummary,
} from "./types";

export const getSnapshots = async (projectId: number): Promise<Snapshot[]> => {
  const res = await api.get(`/projects/${projectId}/snapshots`);
  return res.data;
};

export const getSummary = async (snapshotId: number): Promise<Summary> => {
  const res = await api.get(`/snapshots/${snapshotId}/summary`);
  return res.data;
};

export const getTaskProgress = async (
  snapshotId: number,
): Promise<TaskProgress> => {
  const res = await api.get(`/snapshots/${snapshotId}/tasks-progress`);
  return res.data;
};

export const getCommits = async (snapshotId: number): Promise<Commit[]> => {
  const res = await api.get(`/snapshots/${snapshotId}/commits`);
  return res.data;
};

export const getRepoSummary = async (
  snapshotId: number,
): Promise<RepoSummary[]> => {
  const res = await api.get(`/snapshots/${snapshotId}/repos-summary`);
  return res.data;
};

export const getDailySummary = async (
  snapshotId: number,
): Promise<DailySummary[]> => {
  const res = await api.get(`/snapshots/${snapshotId}/daily-summary`);
  return res.data;
};

export const getProjectsByGroup = async (groupId: number) => {
  const res = await api.get(`/groups/${groupId}/projects`);
  return res.data;
};
