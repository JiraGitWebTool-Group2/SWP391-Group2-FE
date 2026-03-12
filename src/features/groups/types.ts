export interface Group {
  groupId: number;
  groupName: string;
  description?: string;
  classId?: number;
  className?: string;

  createdAt?: string;
}

export interface CreateGroupRequest {
  groupName: string;
  description?: string;
  classId?: number;
}
export interface Project {
  projectId: number;
  projectName: string;
  jiraProjectKey?: string;
  githubOrg?: string;
  description?: string;
}

export interface CreateProjectRequest {
  projectName: string;
  jiraKey: string;
  githubOrg: string;
  description: string;
  createdByUserId: number;
}

/* STUDENT IN GROUP */

export interface GroupStudent {
  userId: number;
  fullName: string;
  email: string;
  systemRole: string;
  groupRole: string;
  joinedAt: string;
  isActive: boolean;
}

/* STUDENT IN CLASS */

export interface ClassStudent {
  classId: number;
  studentId: number;
  studentEmail: string;
  studentName: string;
  studentRole: string;
  joinedAt: string;
  isActive: boolean;
  groupId: number | null;
  groupName: string | null;
}

export interface AddStudentRequest {
  studentId: number;
}
