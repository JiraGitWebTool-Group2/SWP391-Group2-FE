"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLecturers } from "../services";
import type { AllLecturer } from "../types";

interface Props {
  onCreate: (data: {
    classCode: string;
    courseCode: string;
    className: string;
    lecturerUserId?: number;
    status: string;
  }) => void;
  onClose: () => void;
}

export default function CreateClassForm({ onCreate, onClose }: Props) {
  const [classCode, setClassCode] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [className, setClassName] = useState("");
  const [status, setStatus] = useState("PLANNING");

  const [allLecturers, setAllLecturers] = useState<AllLecturer[]>([]);
  const [selectedLecturer, setSelectedLecturer] = useState<
    number | undefined
  >();

  /* ================= LOAD LECTURERS ================= */

  useEffect(() => {
    const loadLecturers = async () => {
      try {
        const data = await getLecturers();
        setAllLecturers(data);
      } catch {
        console.error("Cannot load lecturers");
      }
    };

    loadLecturers();
  }, []);

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!classCode || !courseCode || !className) {
      alert("Please fill all required fields");
      return;
    }

    onCreate({
      classCode,
      courseCode,
      className,
      lecturerUserId: selectedLecturer,
      status,
    });
  };

  return (
    <div className="bg-white border rounded-2xl shadow-md p-8 mb-8 max-w-3xl">
      ```
      <h2 className="text-xl font-semibold mb-6">Create Class</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CLASS CODE + COURSE CODE */}

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Class Code</Label>
            <Input
              className="bg-gray-50 focus:bg-white"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="SE1701"
            />
          </div>

          <div className="space-y-2">
            <Label>Course Code</Label>
            <Input
              className="bg-gray-50 focus:bg-white"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="PRJ301"
            />
          </div>
        </div>

        {/* CLASS NAME */}

        <div className="space-y-2">
          <Label>Class Name</Label>
          <Input
            className="bg-gray-50 focus:bg-white"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Software Engineering Class"
          />
        </div>

        {/* LECTURER */}

        <div className="space-y-2">
          <Label>Lecturer</Label>

          <select
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedLecturer || ""}
            onChange={(e) =>
              setSelectedLecturer(
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          >
            <option value="">Select Lecturer</option>

            {allLecturers.map((l) => (
              <option key={l.lecturerId} value={l.lecturerId}>
                {l.fullName} ({l.email})
              </option>
            ))}
          </select>
        </div>

        {/* STATUS */}

        <div className="space-y-2">
          <Label>Status</Label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="PLANNING">PLANNING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">Create Class</Button>
        </div>
      </form>
    </div>
  );
}
