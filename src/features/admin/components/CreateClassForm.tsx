"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getLecturers } from "../services";
import type { AllLecturer } from "../types";

interface Props {
  onCreate: (data: {
    semesterId: number;
    classCode: string;
    lecturerUserId?: number;
    status: string;
  }) => void;
  onClose: () => void;
}

export default function CreateClassForm({ onCreate, onClose }: Props) {
  const { semesterId } = useParams(); // ✅ FIX

  const [classCode, setClassCode] = useState("");
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

    if (!classCode) {
      alert("Please fill class code");
      return;
    }

    if (!semesterId) {
      alert("Semester ID not found");
      return;
    }

    onCreate({
      semesterId: Number(semesterId),
      classCode,
      lecturerUserId: selectedLecturer,
      status,
    });
  };

  return (
    <div className="bg-white border rounded-2xl shadow-md p-8 mb-8 max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Create Class</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CLASS CODE */}

        <div className="space-y-2">
          <Label>Class Code</Label>

          <Input
            className="bg-gray-50 focus:bg-white"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            placeholder="SE1701"
          />
        </div>

        {/* LECTURER */}

        <div className="space-y-2">
          <Label>Lecturer</Label>

          <select
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 focus:bg-white"
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
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 focus:bg-white"
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
