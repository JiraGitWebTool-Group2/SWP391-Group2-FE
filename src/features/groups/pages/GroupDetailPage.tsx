import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GroupDetailPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Group Detail</CardTitle>
          <CardDescription>SP26 - SWP391</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <p>
            <strong>Lecturer:</strong> Nguyen Van A
          </p>
          <p>
            <strong>Members:</strong> 5
          </p>
          <Button>Go to Dashboard</Button>
          <Button variant="outline">Sync Data</Button>
        </CardContent>
      </Card>
    </div>
  );
}
