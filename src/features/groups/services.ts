import { api } from "@/lib/axios";

import type {
  CreateGroupRequest,
  CreateProjectRequest,
  Group,
  GroupStudent,
  Project,
} from "./types";

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

export const updateGroup = async (groupId: number, payload: any) => {
  const res = await api.put(`/groups/${groupId}`, payload);
  return res.data;
};

export const deleteGroup = async (groupId: number) => {
  const res = await api.delete(`/groups/${groupId}`);
  return res.data;
};

/* ================= PROJECT ================= */

export const getProjectsByGroup = async (
  groupId: number,
): Promise<Project[]> => {
  const res = await api.get(`/groups/${groupId}/projects`);
  return res.data;
};
export const getMyGroup = async () => {
  const res = await api.get("/Users/me/group");
  return res.data;
};

export const createProjectInGroup = async (
  groupId: number,
  payload: CreateProjectRequest,
): Promise<Project> => {
  const res = await api.post(`/groups/${groupId}/projects`, payload);
  return res.data;
};

export const updateProject = async (
  groupId: number,
  projectId: number,
  payload: CreateProjectRequest,
): Promise<Project> => {
  const res = await api.put(
    `/groups/${groupId}/projects/${projectId}`,
    payload,
  );
  return res.data;
};

export const deleteProject = async (groupId: number, projectId: number) => {
  const res = await api.delete(`/groups/${groupId}/projects/${projectId}`);
  return res.data;
};

// export const configureIntegration = async (
//   groupId: number,
//   projectId: number,
//   payload: {
//     jiraProjectKey: string;
//     githubOrg: string;
//   },
// ) => {
//   const res = await api.put(
//     `/groups/${groupId}/projects/${projectId}/integration`,
//     payload,
//   );

//   return res.data;
// };

/* ================= CLASSES ================= */

export const getClassesOfSemester = async (semesterId: number) => {
  const res = await api.get("/classes", {
    params: { semesterId },
  });

  return res.data;
};
export const getClasses = async () => {
  const res = await api.get("/classes");
  return res.data;
};
export const getClassById = async (id: number) => {
  const res = await api.get(`/classes/${id}`);
  return res.data;
};

export const getGroupsByClass = async (classId: number) => {
  const res = await api.get(`/classes/${classId}/groups`);
  return res.data;
};

export const getClassesOfLecturer = async (lecturerId: number) => {
  const res = await api.get(`/lecturers/${lecturerId}/classes`);
  return res.data;
};

/* ================= STUDENTS ================= */

export const getStudentsOfGroup = async (
  groupId: number,
): Promise<GroupStudent[]> => {
  const res = await api.get(`/groups/${groupId}/students`);
  return res.data;
};

export const addStudentToGroup = async (
  groupId: number,
  userId: number,
  roleId: number,
) => {
  const res = await api.post(`/groups/${groupId}/students`, {
    userId,
    roleId,
  });

  return res.data;
};

export const removeStudentFromGroup = async (
  groupId: number,
  studentId: number,
) => {
  const res = await api.delete(`/groups/${groupId}/students/${studentId}`);
  return res.data;
};

export const getStudentsOfClass = async (classId: number) => {
  const res = await api.get(`/classes/${classId}/students`);
  return res.data;
};

export const getLecturerById = async (lecturerId: number) => {
  const res = await api.get(`/lecturers/${lecturerId}`);
  return res.data;
};
