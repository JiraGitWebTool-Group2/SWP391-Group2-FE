import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  FolderGit2,
  GitBranch,
  BarChart3,
  GraduationCap,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

export function DashboardPage() {
  const features = [
    {
      title: "Class Management",
      description: "Create and manage classes, assign lecturers and students.",
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Group Management",
      description: "Organize students into groups inside each class.",
      icon: <Users className="h-8 w-8 text-indigo-600" />,
    },
    {
      title: "Project Management",
      description: "Manage student projects and their repositories.",
      icon: <FolderGit2 className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Repository Tracking",
      description: "Track commits and monitor repository activity.",
      icon: <GitBranch className="h-8 w-8 text-emerald-600" />,
    },
    {
      title: "Snapshots & Reports",
      description: "Generate contribution reports for evaluation.",
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
    },
    {
      title: "Dashboard Overview",
      description: "Quick access to the main features of the system.",
      icon: <LayoutDashboard className="h-8 w-8 text-pink-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-12 py-14 space-y-14">
      {/* HEADER */}

      <div className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Lecturer Dashboard
        </h1>

        <p className="text-slate-500 text-base leading-relaxed">
          Welcome to the lecturer management system. From here you can manage
          classes, organize student groups, track repositories and monitor
          student contributions across projects.
        </p>
      </div>

      {/* FEATURE GRID */}

      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* subtle gradient hover */}

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

            <CardHeader className="relative flex flex-row items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-white shadow-sm transition">
                {feature.icon}
              </div>

              <CardTitle className="text-lg font-semibold text-slate-800">
                {feature.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>

              <div className="flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition">
                Explore feature
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
