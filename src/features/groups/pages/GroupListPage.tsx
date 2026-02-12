import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function GroupListPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Groups</h1>
            <p className="text-muted-foreground">
              Manage student project groups & monitor progress
            </p>
          </div>
          <Button>Create Group</Button>
        </div>

        {/* KPI */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Groups</p>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-3xl font-bold">9</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4">
          <Input placeholder="Search group..." />
          <Input placeholder="Filter by lecturer..." />
          <Input placeholder="Filter by status..." />
        </div>

        {/* Group Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">Group 2</h2>
                  <p className="text-sm text-muted-foreground">
                    SWP391 Support Tool
                  </p>
                </div>
                <Badge>Active</Badge>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>Leader: Nguyen Van A</p>
                <p>Lecturer: Dr. Tran</p>
                <p>Members: 5</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
