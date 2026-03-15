export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: string;
  key: string;
  summary: string;
  assignee?: string;
  status: TaskStatus;
}
