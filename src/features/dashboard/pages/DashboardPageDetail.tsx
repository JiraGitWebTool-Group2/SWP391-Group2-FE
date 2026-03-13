import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardFilter from "../components/DashboardFilter";

import {
  getSummary,
  getTaskProgress,
  getCommits,
  getRepoSummary,
  getDailySummary,
  getProjectsByGroup,
} from "../services";

import type {
  Summary,
  TaskProgress,
  Commit,
  RepoSummary,
  DailySummary,
} from "../types";

import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  GitCommit,
  FolderGit2,
  Users,
  Activity,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPageDetail() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const [snapshotId, setSnapshotId] = useState<number | null>(null);

  const [summary, setSummary] = useState<Summary | null>(null);
  const [progress, setProgress] = useState<TaskProgress | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [repos, setRepos] = useState<RepoSummary[]>([]);
  const [daily, setDaily] = useState<DailySummary[]>([]);
  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (!groupId) return;

    const loadProject = async () => {
      const data = await getProjectsByGroup(Number(groupId));
      if (data.length > 0) {
        setProjectId(data[0].projectId);
      }
    };

    loadProject();
  }, [groupId]);

  useEffect(() => {
    if (!snapshotId) return;

    const loadDashboard = async () => {
      const [s, p, c, r, d] = await Promise.all([
        getSummary(snapshotId),
        getTaskProgress(snapshotId),
        getCommits(snapshotId),
        getRepoSummary(snapshotId),
        getDailySummary(snapshotId),
      ]);

      setSummary(s);
      setProgress(p);
      setCommits(c);
      setRepos(r);
      setDaily(d);
    };

    loadDashboard();
  }, [snapshotId]);

  const taskData = progress && [
    { name: "Todo", value: progress.todoTasks },
    { name: "In Progress", value: progress.inProgressTasks },
    { name: "Done", value: progress.doneTasks },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Project Analytics
            </h1>

            <p className="text-muted-foreground">
              Snapshot insights of repository activity
            </p>
          </div>
        </div>

        {projectId && (
          <DashboardFilter
            projectId={projectId}
            onSelectSnapshot={setSnapshotId}
          />
        )}

        {/* KPI CARDS */}

        {summary && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur border rounded-2xl p-6 shadow hover:shadow-lg transition flex items-center gap-4">
              <GitCommit className="text-blue-500" size={32} />

              <div>
                <p className="text-sm text-muted-foreground">Total Commits</p>

                <h2 className="text-3xl font-bold">{summary.totalCommits}</h2>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur border rounded-2xl p-6 shadow hover:shadow-lg transition flex items-center gap-4">
              <FolderGit2 className="text-purple-500" size={32} />

              <div>
                <p className="text-sm text-muted-foreground">Repositories</p>

                <h2 className="text-3xl font-bold">
                  {summary.distinctRepositories}
                </h2>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur border rounded-2xl p-6 shadow hover:shadow-lg transition flex items-center gap-4">
              <Users className="text-green-500" size={32} />

              <div>
                <p className="text-sm text-muted-foreground">Contributors</p>

                <h2 className="text-3xl font-bold">
                  {summary.distinctContributors}
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* CHART SECTION */}

        <div className="grid md:grid-cols-2 gap-8">
          {/* COMMITS CHART */}

          <div className="bg-white rounded-2xl shadow border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={18} />
              <h2 className="font-semibold">Commit Activity</h2>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={daily}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalCommits" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TASK PIE */}

          {taskData && (
            <div className="bg-white rounded-2xl shadow border p-6">
              <h2 className="font-semibold mb-4">Task Progress</h2>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={taskData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#10b981" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* REPOSITORY LEADERBOARD */}

        <div>
          <h2 className="text-xl font-semibold mb-4">Repository Leaderboard</h2>

          <div className="bg-white rounded-2xl shadow border overflow-hidden">
            {repos
              .sort((a, b) => b.commitCount - a.commitCount)
              .map((r, i) => (
                <div
                  key={r.repoId}
                  className="flex justify-between px-6 py-4 border-b last:border-0 hover:bg-gray-50"
                >
                  <div className="flex gap-3 items-center">
                    <span className="text-gray-400 w-6">#{i + 1}</span>

                    <span className="font-medium">{r.repoName}</span>
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {r.commitCount} commits
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* RECENT COMMITS */}

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Commits</h2>

          <div className="bg-white rounded-2xl shadow border">
            {commits.slice(0, 10).map((c) => (
              <div
                key={c.commitId}
                className="p-5 border-b last:border-0 hover:bg-gray-50"
              >
                <p className="font-medium">{c.message}</p>

                <a
                  href={c.commitUrl}
                  target="_blank"
                  className="text-blue-600 text-sm hover:underline"
                >
                  {c.commitHash}
                </a>

                <p className="text-sm text-muted-foreground">
                  {c.repoName} — {new Date(c.committedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
