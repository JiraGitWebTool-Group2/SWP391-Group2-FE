import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function GroupDetailPage() {
  return (
    <div className="p-8 space-y-10">
      {/* BACK BUTTON */}
      <Link to="/groups">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft size={16} />
          Back to Groups
        </Button>
      </Link>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Group Name
          </h1>
          <p className="text-muted-foreground mt-2">SWP391 Project Title</p>
        </div>

        <Badge className="px-4 py-1 text-sm bg-green-500/10 text-green-600">
          Active
        </Badge>
      </div>

      {/* INFO GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="rounded-3xl shadow-md">
          <CardHeader>
            <CardTitle>Group Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Leader: --</p>
            <p>Lecturer: --</p>
            <p>Total Members: --</p>
            <p>Created Date: --</p>
            <p>Semester: --</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-md">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={60} className="h-3" />
            <p className="text-sm text-muted-foreground">60% Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* MEMBERS SECTION */}
      <Card className="rounded-3xl shadow-md">
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>

        <CardContent className="divide-y text-sm">
          <div className="flex justify-between py-3 font-medium">
            <span>Name</span>
            <span>Role</span>
          </div>

          <div className="flex justify-between py-3 text-muted-foreground">
            <span>--</span>
            <span>--</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
