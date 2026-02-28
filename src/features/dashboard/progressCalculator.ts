import type { DashboardResponse } from "./types";

export const calculateCompletion = (data: DashboardResponse | null) => {
  if (!data) return 0;

  const done = data.issues.byStatus["Done"] ?? 0;
  const total = data.issues.total ?? 0;

  if (total === 0) return 0;

  return Math.round((done / total) * 100);
};
