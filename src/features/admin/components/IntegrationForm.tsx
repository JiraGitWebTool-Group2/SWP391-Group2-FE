import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IntegrationForm() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardContent className="p-6 space-y-4">
        <div>
          <Label>Jira URL</Label>
          <Input placeholder="https://your-domain.atlassian.net" />
        </div>

        <div>
          <Label>Jira API Token</Label>
          <Input type="test" placeholder="Enter Jira token" />
        </div>

        <div>
          <Label>GitHub Token</Label>
          <Input type="test" placeholder="Enter GitHub token" />
        </div>

        <Button className="w-full bg-teal-500">Save Configuration</Button>
      </CardContent>
    </Card>
  );
}
