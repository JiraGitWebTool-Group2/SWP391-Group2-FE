import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function GroupDetailPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Group 2</h1>
            <p className="text-muted-foreground">SWP391 Support Tool</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Back</Button>
            <Button>Edit Group</Button>
          </div>
        </div>

        {/* KPI */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <p className="text-sm text-muted-foreground">
                Requirements Progress
              </p>
              <Progress value={70} />
              <p className="text-sm font-medium">70%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <p className="text-sm text-muted-foreground">Tasks Progress</p>
              <Progress value={55} />
              <p className="text-sm font-medium">55%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Commits</p>
              <p className="text-3xl font-bold">128</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="commits">Commits</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Leader</p>
                    <p className="font-medium">Nguyen Van A</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lecturer</p>
                    <p className="font-medium">Dr. Tran</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge>Active</Badge>
                  </div>
                </div>

                <div className="pt-4 space-y-2 text-sm">
                  <p>
                    Jira Project:{" "}
                    <span className="text-primary underline cursor-pointer">
                      SWP-01
                    </span>
                  </p>
                  <p>
                    GitHub Repository:{" "}
                    <span className="text-primary underline cursor-pointer">
                      github.com/group2
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members */}
          <TabsContent value="requirements">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Requirements list synced from Jira will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Tasks tracking & assignment will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commits">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Initial commit</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
