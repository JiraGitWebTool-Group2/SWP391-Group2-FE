import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProgressReportPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Progress Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sprint / Week" />
            </SelectTrigger>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Members" />
            </SelectTrigger>
          </Select>
          <RadioGroup className="flex gap-6">
            <label className="flex items-center gap-2">
              <RadioGroupItem value="group" /> Group
            </label>
            <label className="flex items-center gap-2">
              <RadioGroupItem value="individual" /> Individual
            </label>
          </RadioGroup>
          <Button>Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>- Completion Rate</p>
          <p>- Overdue Tasks</p>
          <p>- Progress Timeline</p>
        </CardContent>
      </Card>
    </div>
  );
}
