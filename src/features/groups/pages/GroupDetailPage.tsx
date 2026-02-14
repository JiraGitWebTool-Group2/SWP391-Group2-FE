import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function GroupDetailPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br
    from-orange-50 via-rose-50 to-violet-50
    dark:from-slate-950 dark:via-slate-900 dark:to-slate-900
    p-10 space-y-12"
    >
      <Link to="/groups">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft size={16} />
          Back to Groups
        </Button>
      </Link>

      {/* HEADER */}
      <Card
        className="rounded-3xl shadow-xl
      bg-white/80 dark:bg-slate-900/60
      backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1
              className="text-4xl font-bold
            bg-gradient-to-r from-rose-500 via-orange-500 to-violet-500
            bg-clip-text text-transparent"
            >
              Group Name
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Project Title
            </p>
          </div>

          <Badge className="bg-emerald-100 text-emerald-600 px-4 py-1">
            Active
          </Badge>
        </div>
      </Card>

      {/* INFO GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card
          className="rounded-3xl shadow-md
        bg-white/80 dark:bg-slate-900/60
        backdrop-blur-xl border border-slate-200 dark:border-slate-800"
        >
          <CardHeader>
            <CardTitle>Group Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p>Leader: --</p>
            <p>Lecturer: --</p>
            <p>Total Members: --</p>
            <p>Created Date: --</p>
            <p>Semester: --</p>
          </CardContent>
        </Card>

        <Card
          className="rounded-3xl shadow-md
        bg-white/80 dark:bg-slate-900/60
        backdrop-blur-xl border border-slate-200 dark:border-slate-800"
        >
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={60} className="h-3" />
            <p className="text-sm font-medium text-rose-500">60% Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* MEMBERS */}
      <Card
        className="rounded-3xl shadow-md
      bg-white/80 dark:bg-slate-900/60
      backdrop-blur-xl border border-slate-200 dark:border-slate-800"
      >
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <div className="flex justify-between font-medium pb-2 border-b">
            <span>Name</span>
            <span>Role</span>
          </div>

          <div
            className="flex justify-between items-center
          p-4 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-800
          transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
              <span className="text-slate-700 dark:text-slate-300">--</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400">--</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
