import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function SrsGeneratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-3xl transition-all duration-500 hover:shadow-blue-200/50">
          <CardHeader className="text-center space-y-3 pb-2">
            <div className="flex justify-center">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SRS Generator
            </CardTitle>
            <p className="text-slate-500 text-sm">
              Generate structured Software Requirement Specification document
            </p>
          </CardHeader>

          <CardContent className="space-y-8 pt-6">
            {/* Project Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Project
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-400 transition-all">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Scope Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Scope
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400 transition-all">
                  <SelectValue placeholder="Backlog or Sprint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scope">Scope</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Checkbox Grid */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-600">
                Include Sections
              </label>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "Functional Requirements",
                  "Non-Functional Requirements",
                  "Business Rules",
                  "Traceability Matrix",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <Checkbox />
                    <span className="text-sm text-slate-700 font-medium">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Generate SRS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
