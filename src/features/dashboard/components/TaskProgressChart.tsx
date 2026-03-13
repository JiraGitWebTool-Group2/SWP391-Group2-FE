import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { TaskProgress } from "../types";

interface Props {
  progress: TaskProgress;
}

export default function TaskProgressChart({ progress }: Props) {
  const data = [
    { name: "Todo", value: progress.todoTasks },
    { name: "In Progress", value: progress.inProgressTasks },
    { name: "Done", value: progress.doneTasks },
  ];

  const COLORS = ["#3b82f6", "#eab308", "#22c55e"];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Task Progress</h2>

      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" outerRadius={80} label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
