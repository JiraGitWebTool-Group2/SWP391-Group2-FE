export interface IntegrationConfigRequest {
  provider: string;
  baseUrl: string;
  projectKey?: string;
  org?: string;
  token: string;
}

export interface Group {
  groupId: number;
  groupName: string;
  description: string;
  createdAt: string;
}
export interface CreateGroupRequest {
  groupName: string;
  description: string;
}

export interface Group {
  groupId: number;
  groupName: string;
  description: string;
}

export interface CreateUserRequest {
  email: string;
  fullName: string;
  password: string;
}
export interface User {
  id: string;
  email: string;
  fullName: string;
}
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
