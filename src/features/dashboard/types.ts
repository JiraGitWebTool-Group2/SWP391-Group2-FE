export interface Snapshot {
  snapshotId: number;
  capturedAt: string;
  label: string;
}

export interface Summary {
  snapshotId: number;
  totalCommits: number;
  distinctRepositories: number;
  distinctContributors: number;
}

export interface TaskProgress {
  snapshotId: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  doneTasks: number;
  completionRate: number;
}

export interface Commit {
  commitId: number;
  commitHash: string;
  message: string;
  committedAt: string;
  commitUrl: string;
  repoName: string;
}

export interface RepoSummary {
  repoId: number;
  repoName: string;
  commitCount: number;
}

export interface DailySummary {
  date: string;
  totalCommits: number;
  distinctContributors: number;
  distinctRepositories: number;
}
