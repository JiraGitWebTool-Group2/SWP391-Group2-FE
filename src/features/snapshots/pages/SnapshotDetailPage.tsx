import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSnapshotCommits,
  getSnapshotDailySummary,
  getSnapshotRepoSummary,
} from "../services";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowLeft, GitCommit, CalendarDays, FolderGit2 } from "lucide-react";

export default function SnapshotDetailPage() {
  const { snapshotId } = useParams();
  const navigate = useNavigate();

  const [commits, setCommits] = useState<any[]>([]);
  const [repos, setRepos] = useState<any[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [expanded, setExpanded] = useState(false);

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

  const visibleCommits = expanded ? commits : commits.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Snapshot #{snapshotId}</h1>

            <p className="text-sm text-muted-foreground">
              Repository activity and commit analytics
            </p>
          </div>
        </div>

        {/* REPOSITORY SUMMARY */}

        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5" />
            Repository Summary
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((r) => (
              <Card key={r.repoId} className="hover:shadow-lg transition">
                <CardContent className="p-5 flex flex-col gap-2">
                  <div className="text-sm text-muted-foreground">
                    Repository
                  </div>

                  <div className="font-semibold text-lg">{r.repoName}</div>

                  <div className="text-sm text-slate-500">
                    {r.totalCommits} commits
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* RECENT COMMITS */}

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommit className="w-5 h-5" />
              Recent Commits ({commits.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {visibleCommits.map((c) => (
              <div
                key={c.commitId}
                className="flex gap-4 p-4 border rounded-xl bg-white hover:shadow-md transition"
              >
                <GitCommit className="w-5 h-5 text-slate-400 mt-1" />

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">{c.author}</span>

                    <span className="text-xs text-muted-foreground">
                      {new Date(c.committedAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-sm text-slate-700 mb-2">{c.message}</div>

                  <div className="text-xs text-slate-500">
                    +{c.additions ?? 0} additions / -{c.deletions ?? 0}{" "}
                    deletions
                  </div>
                </div>
              </div>
            ))}

            {/* SHOW MORE / LESS */}

            {commits.length > 8 && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show Less ▲" : "Show More ▼"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* DAILY ACTIVITY */}

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Daily Activity
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {daily.map((d) => (
              <div
                key={d.date}
                className="flex justify-between items-center px-4 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
              >
                <span className="font-medium">
                  {new Date(d.date).toLocaleDateString()}
                </span>

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
