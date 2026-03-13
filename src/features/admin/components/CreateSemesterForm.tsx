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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("PLANNING");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || !startDate || !endDate) {
      toast.error("Please fill all fields");
      return;
    }

    const semesterCode = code.toUpperCase();

    const start = new Date(startDate);
    const end = new Date(endDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // rule 1
    if (start >= end) {
      toast.error("Start date must be before end date");
      return;
    }

    // rule 2
    if (start < today) {
      toast.error("Semester cannot start in the past");
      return;
    }

    // rule 3 validate theo code
    const prefix = semesterCode.substring(0, 2);
    const month = start.getMonth() + 1;

    if (prefix === "SP" && (month < 1 || month > 4)) {
      toast.error("Spring semester must start between January and April");
      return;
    }

    if (prefix === "SU" && (month < 5 || month > 8)) {
      toast.error("Summer semester must start between May and August");
      return;
    }

    if (prefix === "FA" && (month < 9 || month > 12)) {
      toast.error("Fall semester must start between September and December");
      return;
    }

    try {
      await createSemester({
        code: semesterCode,
        startDate,
        endDate,
        status: status as "ACTIVE" | "CLOSED" | "PLANNING",
      });

      toast.success("Semester created successfully");

      onSuccess();
    } catch (error: any) {
      console.error(error);

      if (error.response?.data) {
        const message = error.response.data.toLowerCase();

        if (message.includes("code") || message.includes("exist")) {
          toast.error("Semester code already exists");
        } else {
          toast.error(error.response.data);
        }
      } else {
        toast.error("Create semester failed");
      }
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
              placeholder="Enter code semester (.eg: FA26, SU25)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {/* DATE */}
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
                <SelectItem value="PLANNING">PLANNING</SelectItem>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="CLOSED">CLOSED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BUTTON */}
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
