import { api } from "@/lib/axios";

/* USERS */
export const importUsers = async (users: any[]) => {
  return api.post("/admin/users/import", users);
};

export const createUser = async (data: {
  email: string;
  userGit: string;
  userJira: string;
}) => {
  return api.post("/admin/users", data);
};

/* GROUPS */
export const getGroups = () => {
  return api.get("/groups"); // ❗ bỏ /api
};

/* INTEGRATION */
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
