import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateSemester } from "../services";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  semester: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditSemesterForm({
  semester,
  onClose,
  onSuccess,
}: Props) {
  const [code, setCode] = useState(semester.code);
  const [name, setName] = useState(semester.name);
  const [startDate, setStartDate] = useState(
    semester.startDate?.split("T")[0] || "",
  );
  const [endDate, setEndDate] = useState(semester.endDate?.split("T")[0] || "");
  const [status, setStatus] = useState(semester.status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !startDate || !endDate) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await updateSemester(semester.semesterId, {
        code,
        name,
        startDate,
        endDate,
        status,
      });

      toast.success("Semester updated");

      onSuccess();
      onClose();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-6 shadow-sm border">
      <CardHeader>
        <CardTitle>Edit Semester</CardTitle>
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
            <Input value={name} onChange={(e) => setName(e.target.value)} />
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

            <Select value={status} onValueChange={(value) => setStatus(value)}>
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

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
