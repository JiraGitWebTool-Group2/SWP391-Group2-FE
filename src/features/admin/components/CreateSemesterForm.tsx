"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createSemester } from "../services";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
        code: code || name.replace(/\s/g, "").toUpperCase(),
        name,
        startDate,
        endDate,
        status: status as "ACTIVE" | "INACTIVE" | "PLANNING",
      });

      toast.success("Semester created successfully");
      onSuccess();
    } catch {
      toast.error("Create semester failed");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-6 shadow-sm border">
      <CardHeader>
        <CardTitle>Create Semester</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CODE */}
          <div className="space-y-2">
            <Label>Code</Label>
            <Input
              placeholder="SP26"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {/* NAME */}
          <div className="space-y-2">
            <Label>Semester Name</Label>
            <Input
              placeholder="Spring 2026"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* DATE GRID */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* STATUS */}
          <div className="space-y-2">
            <Label>Status</Label>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="CLOSED">CLOSED</SelectItem>
                <SelectItem value="PLANNING">PLANNING</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">Create Semester</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
