import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

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
            {/* Project Group */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Project Group
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-400 transition-all">
                  <SelectValue placeholder="Select Project Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sp26">SP26 Project</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400 transition-all">
                    <SelectValue placeholder="Issue Type" />
                  </SelectTrigger>
                </Select>

                <Select>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400 transition-all">
                    <SelectValue placeholder="Sprint" />
                  </SelectTrigger>
                </Select>
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
