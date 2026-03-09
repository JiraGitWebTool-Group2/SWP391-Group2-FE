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
    <div className="border p-6 rounded-lg mb-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">Create Class</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Class Code</Label>
          <Input
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
          />
        </div>

        <div>
          <Label>Course Code</Label>
          <Input
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>

        <div>
          <Label>Class Name</Label>
          <Input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>

        {/* LECTURER SELECT */}

        <div>
          <Label>Lecturer</Label>

          <select
            className="border rounded p-2 w-full"
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

        <div>
          <Label>Status</Label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="PLANNING">PLANNING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        {/* BUTTONS */}

        <div className="flex gap-2">
          <Button type="submit">Create</Button>

          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
