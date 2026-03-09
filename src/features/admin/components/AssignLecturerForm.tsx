import { useEffect, useState } from "react";
import { getLecturers, assignLecturer } from "../services";
import { Button } from "@/components/ui/button";

interface Lecturer {
  lecturerId: number;
  fullName: string;
  email: string;
}

export default function AssignLecturerForm({ classId, onSuccess }: any) {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [selectedLecturer, setSelectedLecturer] = useState<number>();

  useEffect(() => {
    const load = async () => {
      const data = await getLecturers();
      setLecturers(data);
    };

    load();
  }, []);

  const handleAssign = async () => {
    if (!selectedLecturer) return;

    await assignLecturer(classId, selectedLecturer);

    onSuccess();
  };

  return (
    <div className="flex gap-3">
      <select
        className="border p-2 rounded"
        onChange={(e) => setSelectedLecturer(Number(e.target.value))}
      >
        <option value="">Select Lecturer</option>

        {lecturers.map((l) => (
          <option key={l.lecturerId} value={l.lecturerId}>
            {l.fullName}
          </option>
        ))}
      </select>

      <Button onClick={handleAssign}>Assign</Button>
    </div>
  );
}
