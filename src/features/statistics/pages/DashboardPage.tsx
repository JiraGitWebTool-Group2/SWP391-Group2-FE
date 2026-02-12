import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Project" />
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sprint" />
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Member" />
          </SelectTrigger>
        </Select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {["Done", "In Progress", "Overdue", "Commits"].map((t) => (
          <Card key={t}>
            <CardContent className="p-6">
              <p className="text-sm">{t}</p>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={60} />
        </CardContent>
      </Card>
    </div>
  );
}
