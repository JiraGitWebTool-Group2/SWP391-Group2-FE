/* ================= INTEGRATIONS ================= */

export type IntegrationProvider = "JIRA" | "GITHUB";

export interface IntegrationConfigRequest {
  provider: IntegrationProvider;
  baseUrl?: string;
  projectKey?: string;
  org?: string;
  token: string;
}

/* ================= GROUPS ================= */

/* ================= USERS ================= */
export type UserRole = "ADMIN" | "LECTURER" | "STUDENT";
export interface CreateUserRequest {
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

/* ================= REPOSITORIES ================= */

export interface CreateOrUpdateRepositoryRequest {
  repoName: string;
  repoUrl: string;
  defaultBranch: string;
}

export interface RepositoryResponse {
  id: number;
  repoName: string;
  repoUrl: string;
  defaultBranch: string;
  projectId: number;
}

/* ================= SNAPSHOTS ================= */

export interface Snapshot {
  snapshotId: number;
  capturedAt: string;
  label: string;
  syncRun: {
    syncRunId: number;
    projectId: number;
    projectName: string;
    triggerType: string;
    scopeType: string;
    sprintId: number;
    runStatus: string;
    startedAt: string;
    finishedAt: string;
  };
}

/* ================= PROJECTS ================= */

export interface CreateProjectRequest {
  projectName: string;
  jiraProjectKey: string;
  githubOrg: string;
  description: string;
}

/* ================= SEMESTERS ================= */

export interface Semester {
  semesterId: number;
  code: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSemesterRequest {
  name: string;
  startDate: string;
  endDate: string;
}

export interface UpdateSemesterRequest {
  name: string;
  startDate: string;
  endDate: string;
}

/* ================= CLASSES ================= */

export interface ClassResponse {
  classId: number;
  semesterId: number;
  className: string;
  subjectCode: string;
  createdAt: string;
}

export interface CreateClassRequest {
  semesterId: number;
  className: string;
  subjectCode: string;
}

/* ================= USERS IN CLASS ================= */

export interface Student {
  id: string;
  fullName: string;
  email: string;
}

export interface Lecturer {
  lecturerId: number;
  lecturerName: string;
  lecturerEmail: string;
}

export interface AllLecturer {
  lecturerId: number;
  fullName: string;
  email: string;
}

export interface Class {
  classId: number;
  semesterId: number;
  classCode: string;

  lecturerUserId?: number;
  status?: string;
}

export interface GroupWithProject {
  groupId: number;
  groupName: string;
  projectId?: number;
  projectName?: string;
}

/* ================= CLASS DETAIL ================= */

export interface ClassDetail {
  classId: number;
  semesterId?: number;
  semesterCode: string;
  classCode: string;
  lecturerUserId: number | null;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

/* ================= STUDENTS IN CLASS ================= */

export interface StudentOfClass {
  classId: number;
  studentId: number;
  studentEmail: string;
  studentName: string;
  groupName: string;
  groupId: number;
  studentRole: string;
  joinedAt: string;
  isActive: boolean;
}

/* ================= BULK ADD STUDENTS ================= */

export interface AddStudentsBulkRequest {
  studentIds: number[];
}

export interface GroupOfClass {
  groupId: number;
  groupName: string;
  projectId?: number;
  projectName?: string;
  integrations?: string[];
}
