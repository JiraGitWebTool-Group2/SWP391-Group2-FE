// src/features/sync/types.ts

export type ScopeType = "SPRINT" | "BACKLOG" | "CUSTOM";

export interface CreateSyncRunRequest {
  projectId: number;
  includeJira: boolean;
  includeGithub: boolean;
  scopeType: ScopeType;
  sprintId?: number | null;
}

export interface StartSyncResponse {
  syncRunId: number;
  status: string;
}
