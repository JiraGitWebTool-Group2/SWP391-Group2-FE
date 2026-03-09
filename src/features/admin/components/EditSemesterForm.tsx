import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateSemester } from "../services";

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
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="border p-6 rounded-lg mt-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">Edit Semester</h2>

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
          <Input value={name} onChange={(e) => setName(e.target.value)} />
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
          <Button type="submit">Save</Button>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
