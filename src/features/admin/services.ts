import { api } from "@/lib/axios";
import type {
  AddStudentsBulkRequest,
  ClassDetail,
  CreateOrUpdateRepositoryRequest,
  CreateUserRequest,
  IntegrationConfigRequest,
  RepositoryResponse,
  Semester,
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
// export const getProjectsByGroup = async (
//   groupId: number,
// ): Promise<Project[]> => {
//   const res = await api.get(`/groups/${groupId}/projects`);
//   return res.data;
// };

/**
 * POST /api/groups/{groupId}/projects
 * Tạo project trong group
 */
// export const createProjectInGroup = async (
//   groupId: number,
//   payload: CreateProjectRequest,
// ): Promise<Project> => {
//   const res = await api.post(`/groups/${groupId}/projects`, payload);
//   return res.data;
// };

/**
 * GET /api/projects/{projectId}
 * Lấy project theo id (optional)
 */
// export const getProjectById = async (
//   projectId?: number,
// ): Promise<Project | null> => {
//   if (!projectId) return null;

//   const res = await api.get(`/projects/${projectId}`);
//   return res.data;
// };

/* ================= SEMESTERS ================= */

export const getSemesters = async (): Promise<Semester[]> => {
  const res = await api.get("/semesters");
  return res.data;
};

export const createSemester = async (data: any) => {
  const res = await api.post("/semesters", data);
  return res.data;
};

export const updateSemester = async (id: number, data: any) => {
  const res = await api.put(`/semesters/${id}`, data);
  return res.data;
};

export const deleteSemester = async (id: number) => {
  const res = await api.delete(`/semesters/${id}`);
  return res.data;
};
export const getSemesterById = async (id: number) => {
  const res = await api.get(`/semesters/${id}`);
  return res.data;
};

/* ================= CLASSES ================= */
/* ================= CLASSES ================= */

export const getClasses = async () => {
  const res = await api.get("/classes");
  return res.data;
};

export const createClass = async (data: {
  semesterId: number;
  classCode: string;
  lecturerUserId?: number;
  status?: string;
}) => {
  const res = await api.post(`/classes`, data);
  return res.data;
};

export const updateClass = async (classId: number, data: any) => {
  const res = await api.put(`/classes/${classId}`, data);
  return res.data;
};

export const deleteClass = async (classId: number) => {
  const res = await api.delete(`/classes/${classId}`);
  return res.data;
};

export const getGroupsByClass = async (classId: number) => {
  const res = await api.get(`/classes/${classId}/groups`);
  return res.data;
};

/* ================= CLASS LECTURERS ================= */

export const assignLecturer = async (classId: number, lecturerId: number) => {
  const res = await api.post(`/classes/${classId}/lecturers`, {
    lecturerId,
  });
  return res.data;
};
export const getLecturersOfClass = async (classId: number) => {
  const res = await api.get(`/classes/${classId}/lecturers`);
  return res.data;
};

export const removeLecturer = async (classId: number, lecturerId: number) => {
  const res = await api.delete(`/classes/${classId}/lecturers/${lecturerId}`);
  return res.data;
};

export const getLecturers = async () => {
  const res = await api.get("/lecturers");
  return res.data;
};

export const getClassById = async (id: number): Promise<ClassDetail> => {
  const res = await api.get(`/classes/${id}`);
  return res.data;
};

export const getLecturerById = async (lecturerId: number) => {
  const res = await api.get(`/lecturers/${lecturerId}`);
  return res.data;
};

export const getClassesOfLecturer = async (lecturerId: number) => {
  const res = await api.get(`/lecturers/${lecturerId}/classes`);
  return res.data;
};

/* ================= CLASS STUDENTS ================= */

export const getStudentsOfClass = async (classId: number) => {
  const res = await api.get(`/classes/${classId}/students`);
  return res.data;
};

export const addStudentsBulk = async (
  classId: number,
  payload: AddStudentsBulkRequest,
) => {
  const res = await api.post(`/classes/${classId}/students/bulk`, payload);
  return res.data;
};

export const removeStudentFromClass = async (
  classId: number,
  studentId: number,
) => {
  const res = await api.delete(`/classes/${classId}/students/${studentId}`);
  return res.data;
};
