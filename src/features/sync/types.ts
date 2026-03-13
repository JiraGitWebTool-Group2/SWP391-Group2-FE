export type ScopeType = "SPRINT" | "BACKLOG" | "CUSTOM";

export interface CreateSyncRunRequest {
  projectId: number;
  includeJira: boolean;
  includeGithub: boolean;
  scopeType: ScopeType;
  sprintId: number | null;
}

export interface StartSyncResponse {
  syncRunId: number;
  status: string;
}

export interface SyncRunDetail {
  syncRunId: number;
  notes?: string;
  runStatus: "SUCCESS" | "FAILED" | "RUNNING";
  startedAt: string;
  finishedAt?: string;
  snapshotId?: number;
}

export interface IntegratedGroup {
  groupId: number;
  groupName: string;
  projectId: number;
  projectName: string;
  classId: number;
  className: string;
}

export interface Class {
  classId: number;
  classCode: string;
}
