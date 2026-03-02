import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSnapshotCommits,
  getSnapshotDailySummary,
  getSnapshotRepoSummary,
} from "../services";

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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Snapshot Detail</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">Commits</h2>

        {commits.map((c) => (
          <div key={c.commitId} className="border p-3 rounded mb-2">
            <div className="font-medium">{c.author}</div>
            <div className="text-sm text-gray-600">{c.message}</div>
            <div className="text-xs text-gray-400">
              {new Date(c.committedAt).toLocaleString()}
            </div>
            <div className="text-xs">
              +{c.additions ?? 0} / -{c.deletions ?? 0}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Repo Summary</h2>
        {repos.map((r) => (
          <div key={r.repoId}>
            {r.repoName}: {r.totalCommits}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Daily Summary</h2>
        {daily.map((d) => (
          <div key={d.date}>
            {d.date}: {d.totalCommits}
          </div>
        ))}
      </section>
    </div>
  );
}
