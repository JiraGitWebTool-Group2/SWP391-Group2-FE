import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSnapshotCommits,
  getSnapshotDailySummary,
  getSnapshotRepoSummary,
} from "../services";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SnapshotDetailPage() {
  const { snapshotId } = useParams();

  const [commits, setCommits] = useState<any[]>([]);
  const [repos, setRepos] = useState<any[]>([]);
  const [daily, setDaily] = useState<any[]>([]);

  useEffect(() => {
    if (!snapshotId) return;

    const id = Number(snapshotId);

    const fetchData = async () => {
      try {
        const [commitData, repoData, dailyData] = await Promise.all([
          getSnapshotCommits(id),
          getSnapshotRepoSummary(id),
          getSnapshotDailySummary(id),
        ]);

        setCommits(commitData);
        setRepos(repoData);
        setDaily(dailyData);
      } catch (err) {
        console.error("Snapshot error:", err);
      }
    };

    fetchData();
  }, [snapshotId]);

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Snapshot #{snapshotId}</h1>

        {/* REPO SUMMARY */}

        <Card>
          <CardHeader>
            <CardTitle>Repository Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {repos.map((r) => (
              <div
                key={r.repoId}
                className="flex justify-between items-center bg-slate-100 rounded-lg p-3"
              >
                <span className="font-medium">{r.repoName}</span>
                <span className="text-sm text-muted-foreground">
                  {r.totalCommits} commits
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* COMMITS */}

        <Card>
          <CardHeader>
            <CardTitle>Commits</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {commits.map((c) => (
              <div
                key={c.commitId}
                className="border rounded-xl p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{c.author}</span>

                  <span className="text-xs text-gray-400">
                    {new Date(c.committedAt).toLocaleString()}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-2">{c.message}</div>

                <div className="text-xs text-gray-500">
                  +{c.additions ?? 0} / -{c.deletions ?? 0}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* DAILY SUMMARY */}

        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {daily.map((d) => (
              <div
                key={d.date}
                className="flex justify-between bg-slate-100 rounded-lg p-3"
              >
                <span>{d.date}</span>
                <span className="text-sm text-muted-foreground">
                  {d.totalCommits} commits
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
