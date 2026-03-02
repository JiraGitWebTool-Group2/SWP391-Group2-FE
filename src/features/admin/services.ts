import { api } from "@/lib/axios";
import type {
  CreateGroupRequest,
  CreateOrUpdateRepositoryRequest,
  CreateProjectRequest,
  CreateUserRequest,
  Group,
  IntegrationConfigRequest,
  Project,
  RepositoryResponse,
} from "./types";

/* ================= USERS ================= */

export const importUsersExcel = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/Users/import-excel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const createUser = async (data: CreateUserRequest) => {
  const res = await api.post("/users", data);
  return res.data;
};

/* ================= GROUPS ================= */

export const getGroups = async (): Promise<Group[]> => {
  const res = await api.get("/groups");
  return res.data;
};

export const createGroup = async (
  payload: CreateGroupRequest,
): Promise<Group> => {
  const res = await api.post("/groups", payload);
  return res.data;
};

/* ================= INTEGRATIONS ================= */

export const getIntegration = async (
  projectId: number,
  provider: IntegrationConfigRequest["provider"],
) => {
  const res = await api.get(`/projects/${projectId}/integrations/${provider}`);
  return res.data;
};

export const updateIntegration = async (
  projectId: number,
  data: IntegrationConfigRequest,
) => {
  const res = await api.put(`/projects/${projectId}/integrations`, data);
  return res.data;
};

/* ================= REPOSITORIES ================= */

export const createRepository = async (
  projectId: number,
  data: CreateOrUpdateRepositoryRequest,
): Promise<RepositoryResponse> => {
  const res = await api.post(`/projects/${projectId}/repositories`, data);
  return res.data;
};

export const updateRepository = async (
  projectId: number,
  repositoryId: number,
  data: CreateOrUpdateRepositoryRequest,
): Promise<RepositoryResponse> => {
  const res = await api.put(
    `/projects/${projectId}/repositories/${repositoryId}`,
    data,
  );
  return res.data;
};

/* ================= SNAPSHOTS ================= */

export const getSnapshotsByGroup = async (groupId: number) => {
  const res = await api.get(`/groups/${groupId}/snapshots`);
  return res.data;
};

/**
 * GET /api/groups/{groupId}/projects
 * Lấy danh sách project theo group
 */
export const getProjectsByGroup = async (
  groupId: number,
): Promise<Project[]> => {
  const res = await api.get(`/groups/${groupId}/projects`);
  return res.data;
};

/**
 * POST /api/groups/{groupId}/projects
 * Tạo project trong group
 */
export const createProjectInGroup = async (
  groupId: number,
  payload: CreateProjectRequest,
): Promise<Project> => {
  const res = await api.post(`/groups/${groupId}/projects`, payload);
  return res.data;
};

/**
 * GET /api/projects/{projectId}
 * Lấy project theo id (optional)
 */
export const getProjectById = async (
  projectId?: number,
): Promise<Project | null> => {
  if (!projectId) return null;

  const res = await api.get(`/projects/${projectId}`);
  return res.data;
};
