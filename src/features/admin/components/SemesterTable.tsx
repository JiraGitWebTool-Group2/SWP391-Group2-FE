import type { Semester } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Layers } from "lucide-react";

interface Props {
  semesters: Semester[];
  onClickSemester: (id: number) => void;
  onDeleteSemester: (id: number) => void;
  onEditSemester: (semester: Semester) => void;
}

export default function SemesterTable({
  semesters,
  onClickSemester,
  onDeleteSemester,
  onEditSemester,
}: Props) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "bg-green-100 text-green-700";
    if (status === "UPCOMING") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {semesters.map((s) => (
            <TableRow
              key={s.semesterId}
              className="hover:bg-slate-50 transition"
            >
              <TableCell
                className="font-medium cursor-pointer"
                onClick={() => onClickSemester(s.semesterId)}
              >
                {s.code}
              </TableCell>

              <TableCell>{s.name}</TableCell>

              <TableCell>{formatDate(s.startDate)}</TableCell>

              <TableCell>{formatDate(s.endDate)}</TableCell>

              <TableCell>
                <Badge className={getStatusColor(s.status)}>{s.status}</Badge>
              </TableCell>

              <TableCell className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditSemester(s)}
                >
                  <Pencil size={16} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteSemester(s.semesterId)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onClickSemester(s.semesterId)}
                >
                  <Layers size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
