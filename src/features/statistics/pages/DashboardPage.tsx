import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Clock, AlertCircle, GitCommit } from "lucide-react";

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-10 py-12 space-y-12">
      {/* PAGE TITLE */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Project Dashboard
        </h1>
      </div>

      {/* FILTER SECTION */}
      <Card className="rounded-3xl border-0 bg-white/70 backdrop-blur-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-4">
          {["Select Project", "Select Sprint", "Select Member"].map(
            (placeholder) => (
              <Select key={placeholder}>
                <SelectTrigger className="w-[220px] h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-400 transition-all">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </Select>
            ),
          )}
        </div>
      </Card>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            title: "Completed Tasks",
            icon: <CheckCircle2 className="text-emerald-500" />,
          },
          {
            title: "In Progress",
            icon: <Clock className="text-blue-500" />,
          },
          {
            title: "Overdue Tasks",
            icon: <AlertCircle className="text-red-500" />,
          },
          {
            title: "Total Commits",
            icon: <GitCommit className="text-purple-500" />,
          },
        ].map((item) => (
          <Card
            key={item.title}
            className="rounded-3xl border-0 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>
                <div className="mt-3 h-8 w-20 bg-slate-100 rounded-lg" />
              </div>
              <div className="text-4xl opacity-80">{item.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* CHART */}
        <Card className="rounded-3xl border-0 bg-white shadow-md hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-700">
              Task Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-slate-400">
              Chart Area
            </div>
          </CardContent>
        </Card>

        {/* PROGRESS */}
        <Card className="rounded-3xl border-0 bg-white shadow-md hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-700">
              Sprint Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Overall Completion</span>
              <span>--%</span>
            </div>
            <Progress value={0} className="h-3 rounded-full" />
          </CardContent>
        </Card>
      </div>

      {/* SECOND ROW */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* ACTIVITY */}
        <Card className="rounded-3xl border-0 bg-white shadow-md hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-700">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-11 bg-slate-100 rounded-xl" />
            <div className="h-11 bg-slate-100 rounded-xl" />
            <div className="h-11 bg-slate-100 rounded-xl" />
            <div className="h-11 bg-slate-100 rounded-xl" />
          </CardContent>
        </Card>

        {/* MEMBER PERFORMANCE */}
        <Card className="rounded-3xl border-0 bg-white shadow-md hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-700">
              Member Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Member</span>
                  <span>--%</span>
                </div>
                <Progress value={0} className="h-2 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
