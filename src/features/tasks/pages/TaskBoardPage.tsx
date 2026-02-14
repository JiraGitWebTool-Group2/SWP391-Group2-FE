import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

export function TaskBoardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-10 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Task Board
        </h1>
        <p className="text-slate-500 text-sm">
          Visual overview of task workflow
        </p>
      </div>

      {/* Board */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: "To Do", color: "bg-slate-100" },
          { name: "In Progress", color: "bg-blue-50" },
          { name: "Done", color: "bg-emerald-50" },
        ].map((col) => (
          <div
            key={col.name}
            className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-4 space-y-4"
          >
            {/* Column Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 rounded-2xl ${col.color}`}
            >
              <div className="flex items-center gap-2">
                <Circle size={10} className="text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-700">
                  {col.name}
                </h2>
              </div>
              <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-md shadow-sm">
                2
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {[1, 2].map((t) => (
                <Card
                  key={t}
                  className="rounded-2xl border-0 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm font-semibold text-slate-800">
                      Task {t}
                    </p>
                    <p className="text-xs text-slate-500">Assigned to Member</p>
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
