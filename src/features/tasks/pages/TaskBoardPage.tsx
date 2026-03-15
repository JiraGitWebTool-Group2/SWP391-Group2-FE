import { Card, CardContent } from "@/components/ui/card";
import { Circle } from "lucide-react";
import { useTaskProgress } from "../hooks/useTaskProgress";

export function TaskBoardPage() {
  const { todo, inProgress, done } = useTaskProgress(1); // projectId

  const columns = [
    { name: "To Do", tasks: todo, color: "bg-slate-100" },
    { name: "In Progress", tasks: inProgress, color: "bg-blue-50" },
    { name: "Done", tasks: done, color: "bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-10 space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">Task Board</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col.name}
            className="rounded-3xl bg-white shadow-xl p-4 space-y-4"
          >
            <div
              className={`flex items-center justify-between px-4 py-3 rounded-2xl ${col.color}`}
            >
              <div className="flex items-center gap-2">
                <Circle size={10} className="text-slate-400" />
                <h2 className="text-sm font-semibold">{col.name}</h2>
              </div>
              <span className="text-xs bg-white px-2 py-1 rounded-md">
                {col.tasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {col.tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold">{task.summary}</p>
                    <p className="text-xs text-slate-500">
                      {task.assignee ?? "Unassigned"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
