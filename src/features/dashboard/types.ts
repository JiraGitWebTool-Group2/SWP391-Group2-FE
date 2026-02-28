export interface DashboardResponse {
  groupId: number;
  snapshotId: number;
  capturedAt: string;

  issues: {
    total: number;
    byStatus: Record<string, number>;
    byType: Record<string, number>;
    byPriority: Record<string, number>;
  };

  commits: {
    totalInSnapshot: number;
    linkedIssues: number;
    links: number;
    topContributors: {
      author: string;
      commitCount: number;
    }[];
  };
}
