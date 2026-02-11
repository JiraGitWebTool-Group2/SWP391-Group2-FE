import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const SyncForm = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Synchronization</CardTitle>
          <CardDescription>Sync Jira and GitHub data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Project Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sp26">SP26 Project</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <Checkbox /> Jira
            </label>
            <label className="flex items-center gap-2">
              <Checkbox /> GitHub
            </label>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Jira Scope</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Issue Type" />
                </SelectTrigger>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sprint" />
                </SelectTrigger>
              </Select>
            </CardContent>
          </Card>

          <Button className="w-full">Sync</Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default SyncForm;
