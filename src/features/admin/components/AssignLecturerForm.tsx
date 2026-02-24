import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function AssignLecturerForm() {
  return (
    <Card className="max-w-lg">
      <CardContent className="p-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Select Group</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Group A</SelectItem>
              <SelectItem value="2">Group B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Select Lecturer</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose lecturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Dr. Tran</SelectItem>
              <SelectItem value="2">Dr. Nguyen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Assign</Button>
      </CardContent>
    </Card>
  );
}
