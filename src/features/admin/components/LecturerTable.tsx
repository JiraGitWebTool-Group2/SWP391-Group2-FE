import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  getClasses,
  getClassesOfLecturer,
  getLecturers,
  getLecturersOfClass,
} from "../services";
import { useNavigate } from "react-router-dom";

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
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">Lecturer List</h2>
        </div>

        <table className="w-full border rounded-md">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Assigned Classes</th>
              <th className="p-3 text-center">View Details</th>
            </tr>
          </thead>

          <tbody>
            {lecturers.map((lecturer: any) => (
              <tr key={lecturer.lecturerId} className="border-t">
                <td className="p-3">{lecturer.fullName}</td>
                <td className="p-3">{lecturer.email}</td>
                <td className="p-3">{classCount[lecturer.lecturerId] || 0}</td>

                <td className="p-3 text-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      navigate(`/admin/lecturers/${lecturer.lecturerId}`)
                    }
                  >
                    View Details
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
