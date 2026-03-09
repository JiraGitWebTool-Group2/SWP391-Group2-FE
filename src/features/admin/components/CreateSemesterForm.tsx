"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createSemester } from "../services";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateSemesterForm({ onClose, onSuccess }: Props) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !startDate || !endDate) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createSemester({
        code: name.replace(/\s/g, "").toUpperCase(),
        name,
        startDate,
        endDate,
        status: status as "ACTIVE" | "INACTIVE" | "PLANNING",
      });

      toast.success("Semester created successfully");

      onSuccess();
    } catch (error) {
      toast.error("Create semester failed");
    }
  };

  return (
    <div className="border p-6 rounded-lg mt-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">Create Semester</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Code</Label>
          <Input
            placeholder="SP26"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div>
          <Label>Semester Name</Label>
          <Input
            placeholder="Spring 2026"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <Label>Status</Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
            <option value="PLANNING">PLANNING</option>
          </select>
        </div>

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
