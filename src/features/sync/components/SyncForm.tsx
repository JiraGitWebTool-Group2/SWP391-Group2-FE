import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RefreshCw, Link2, CheckCircle } from "lucide-react";

const SyncForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Card className="rounded-3xl border-0 bg-white/70 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-blue-200/50">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Data Synchronization
            </CardTitle>
            <CardDescription className="text-slate-500">
              Sync Jira and GitHub data
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Repository Links */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  GitHub Repository URL
                </label>
                <div className="flex gap-3">
                  <Input
                    placeholder="https://github.com/your-org/your-repo"
                    className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Jira Project URL
                </label>
                <div className="flex gap-3">
                  <Input
                    placeholder="https://your-domain.atlassian.net"
                    className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              {/* Check Button */}
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Check Connection
              </Button>
            </div>

            {/* Platform Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-600">
                Select Platforms
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Jira", "GitHub"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-blue-50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <Checkbox />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Jira Scope */}
            <Card className="rounded-2xl border border-slate-200 shadow-sm bg-slate-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Jira Scope
                </CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400">
                    <SelectValue placeholder="Issue Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400">
                    <SelectValue placeholder="Sprint" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sprint1">Sprint 1</SelectItem>
                    <SelectItem value="sprint2">Sprint 2</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            {/* GitHub Scope */}
            <Card className="rounded-2xl border border-slate-200 shadow-sm bg-slate-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  GitHub Scope
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  {["Commits", "Pull Requests"].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-indigo-50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <Checkbox />
                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-500">From</label>
                    <Input
                      type="date"
                      className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-500">To</label>
                    <Input
                      type="date"
                      className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sync Button */}
            <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
              <RefreshCw size={18} />
              Sync Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SyncForm;
