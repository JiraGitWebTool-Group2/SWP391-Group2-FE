import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

export function ProgressReportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* GENERATE CARD */}
        <Card className="rounded-3xl border-0 bg-white/70 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-blue-200/50">
          <CardHeader className="space-y-2 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md">
                <FileText className="text-white" size={20} />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Generate Progress Report
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Select Sprint */}
            <Select>
              <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-400 transition-all">
                <SelectValue placeholder="Sprint / Week" />
              </SelectTrigger>
            </Select>

            {/* Select Member */}
            <Select>
              <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400 transition-all">
                <SelectValue placeholder="Members" />
              </SelectTrigger>
            </Select>

            {/* Radio Group */}
            <RadioGroup className="grid grid-cols-2 gap-4">
              {[
                { label: "Group", value: "group" },
                { label: "Individual", value: "individual" },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-blue-50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <RadioGroupItem value={item.value} />
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                </label>
              ))}
            </RadioGroup>

            {/* Button */}
            <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* PREVIEW CARD */}
        <Card className="rounded-3xl border-0 bg-white shadow-xl transition-all hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-700">
              Report Preview
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              Completion Rate
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              Overdue Tasks
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              Progress Timeline
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
