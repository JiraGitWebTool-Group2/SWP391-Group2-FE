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
  return api.get("/groups");
};

/* INTEGRATION */
export const getIntegration = (
  projectId: number,
  provider: "JIRA" | "GITHUB", // PHẢI VIẾT HOA
) => {
  return api.get(`/projects/${projectId}/integrations/${provider}`);
};

export const updateIntegration = (
  projectId: number,
  data: {
    provider: "JIRA" | "GITHUB";
    baseUrl?: string;
    org?: string;
    projectKey?: string;
    token?: string;
  },
) => {
  return api.put(`/projects/${projectId}/integrations`, data);
};
