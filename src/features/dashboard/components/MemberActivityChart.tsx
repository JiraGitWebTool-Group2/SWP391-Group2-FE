import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { Commit } from "../types";

interface Props {
  commits: Commit[];
}

export default function MemberActivityChart({ commits }: Props) {
  const map: Record<string, number> = {};

  commits.forEach((c) => {
    map[c.repoName] = (map[c.repoName] || 0) + 1;
  });

  const data = Object.entries(map).map(([name, commits]) => ({
    memberName: name,
    commits,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-4">Repo Activity</h2>

      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="memberName" />
        <YAxis />

        <Tooltip />

        <Bar dataKey="commits" />
      </BarChart>
    </div>
  );
}
