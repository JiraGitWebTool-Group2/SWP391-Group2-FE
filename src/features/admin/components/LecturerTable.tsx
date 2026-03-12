import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import { getClassesOfLecturer, getLecturers } from "../services";
import { useNavigate } from "react-router-dom";

import { Eye } from "lucide-react";

export default function LecturerTable() {
  const [lecturers, setLecturers] = useState<any[]>([]);
  const [classCount, setClassCount] = useState<Record<number, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const lecturersData = await getLecturers();
      setLecturers(lecturersData);

      const countMap: Record<number, number> = {};

      await Promise.all(
        lecturersData.map(async (l: any) => {
          const classes = await getClassesOfLecturer(l.lecturerId);
          countMap[l.lecturerId] = classes.length;
        }),
      );

      setClassCount(countMap);
    };

    load();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lecturer List</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="p-4 text-left">Lecturer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Assigned Classes</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lecturers.map((lecturer: any) => (
              <tr
                key={lecturer.lecturerId}
                className="border-b hover:bg-muted/40 transition"
              >
                {/* Lecturer Name + Avatar */}
                <td className="p-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {lecturer.fullName?.charAt(0)}
                  </div>

                  <span className="font-medium">{lecturer.fullName}</span>
                </td>

                {/* Email */}
                <td className="p-4 text-muted-foreground">{lecturer.email}</td>

                {/* Class Count */}
                <td className="p-4">
                  <Badge variant="secondary">
                    {classCount[lecturer.lecturerId] || 0} classes
                  </Badge>
                </td>

                {/* Actions */}
                <td className="p-4 text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() =>
                      navigate(`/admin/lecturers/${lecturer.lecturerId}`)
                    }
                  >
                    <Eye size={16} />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
