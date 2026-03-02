export interface CommitDTO {
  commitId: string;
  author: string;
  message: string;
  committedAt: string;
  additions?: number;
  deletions?: number;
}

export interface RepoSummaryDTO {
  repoName: string;
  totalCommits: number;
  contributors?: number;
}

export interface DailySummaryDTO {
  date: string;
  totalCommits: number;
}
