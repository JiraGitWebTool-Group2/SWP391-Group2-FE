import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2 } from "lucide-react";

export function TraceabilityTable() {
  return (
    <div className="py-10">
      <Card className="rounded-3xl border-0 shadow-2xl bg-white/80 backdrop-blur-xl transition-all duration-500 hover:shadow-blue-200/50">
        <CardHeader className="border-b border-slate-200 pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Traceability Matrix
          </CardTitle>
          <p className="text-sm text-slate-500">
            Requirement mapping and tracking status
          </p>
        </CardHeader>

        <CardContent className="pt-8">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">
                    SRS ID
                  </TableHead>
                  <TableHead className="font-semibold text-slate-600">
                    Jira Issue
                  </TableHead>
                  <TableHead className="font-semibold text-slate-600">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow className="hover:bg-blue-50 transition-colors duration-300">
                  <TableCell className="font-medium text-slate-800">
                    FR-01
                  </TableCell>

                  <TableCell className="text-slate-600">PROJ-101</TableCell>

                  <TableCell>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      Done
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
