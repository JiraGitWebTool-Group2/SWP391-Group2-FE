import { api } from "@/lib/axios";
import type {
  CreateGroupRequest,
  CreateOrUpdateRepositoryRequest,
  CreateUserRequest,
  Group,
} from "./types";

export const importUsers = async (users: any[]) => {
  return api.post("/admin/users/import", users);
};
export const createUser = async (data: CreateUserRequest) => {
  const response = await api.post("/Users", data);
  return response.data;
};

/* ================= GROUPS ================= */ // GET /groups
export const getGroups = async (): Promise<Group[]> => {
  const res = await api.get("/groups");
  return res.data;
};

// POST /groups
export const createGroup = async (
  payload: CreateGroupRequest,
): Promise<Group> => {
  const res = await api.post("/groups", payload);
  return res.data;
};

/* ================= INTEGRATION ================= */
export const getIntegration = (
  projectId: number,
  provider: "jira" | "github",
) => {
  return api.get(`/projects/${projectId}/integrations/${provider}`);
};

export const updateIntegration = (
  projectId: number,
  data: {
    provider: "jira" | "github";
    baseUrl?: string;
    org?: string;
    token: string;
  },
) => {
  return api.put(`/projects/${projectId}/integrations`, data);
};

export const createRepository = async (
  projectId: number,
  data: CreateOrUpdateRepositoryRequest,
) => {
  return api.post(`/projects/${projectId}/repositories`, data);
};

export const updateRepository = async (
  projectId: number,
  repoId: number,
  data: CreateOrUpdateRepositoryRequest,
) => {
  return api.put(`/projects/${projectId}/repositories/${repoId}`, data);
};

/* ================= SNAPSHOTS ================= */

export const getSnapshotsByGroup = async (groupId: number) => {
  const res = await api.get(`/groups/${groupId}/snapshots`);
  return res.data;
};
