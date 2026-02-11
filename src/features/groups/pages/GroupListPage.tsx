import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GroupListPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Project Groups</h1>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((g) => (
          <Card key={g}>
            <CardHeader>
              <CardTitle>Group {g}</CardTitle>
              <CardDescription>SWP391 Project</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Detail
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
