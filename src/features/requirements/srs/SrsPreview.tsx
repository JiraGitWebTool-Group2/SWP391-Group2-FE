import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FileText } from "lucide-react";

export function SrsPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Card className="rounded-3xl border-0 shadow-2xl bg-white/80 backdrop-blur-xl transition-all duration-500 hover:shadow-blue-200/50">
          {/* Header */}
          <CardHeader className="border-b border-slate-200 pb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                <FileText className="text-white" size={22} />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Software Requirement Specification
                </CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  Generated document preview
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-12 py-10 px-10">
            {/* Functional Requirements */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Functional Requirements
                </h3>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
                  <li className="hover:text-blue-600 transition-colors">
                    FR-01: The system shall ...
                  </li>
                </ul>
              </div>
            </section>

            {/* Traceability Matrix */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Traceability Matrix
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-slate-100">
                    <TableRow>
                      <TableHead className="text-slate-600 font-semibold">
                        SRS ID
                      </TableHead>
                      <TableHead className="text-slate-600 font-semibold">
                        Jira Issue
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium text-slate-700">
                        FR-01
                      </TableCell>
                      <TableCell className="text-slate-600">PROJ-123</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
