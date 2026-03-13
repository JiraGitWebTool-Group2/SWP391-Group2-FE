import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import type { DailySummary } from "../types";

interface Props {
  data: DailySummary[];
}

export default function CommitTimelineChart({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-4">Commit Timeline</h2>

      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />
        <YAxis />

        <Tooltip />

        <Line type="monotone" dataKey="totalCommits" />
      </LineChart>
    </div>
  );
}
