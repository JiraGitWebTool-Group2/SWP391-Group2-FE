import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Link2, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Users />
            <CardTitle>Manage Groups</CardTitle>
          </CardHeader>
          <CardContent>Create, edit and monitor student groups.</CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <BookOpen />
            <CardTitle>Manage Lecturers</CardTitle>
          </CardHeader>
          <CardContent>Add and assign lecturers to groups.</CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Settings />
            <CardTitle>Assign Lecturer</CardTitle>
          </CardHeader>
          <CardContent>Assign lecturers to student groups.</CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Link2 />
            <CardTitle>Integration Config</CardTitle>
          </CardHeader>
          <CardContent>Configure Jira & GitHub integration.</CardContent>
        </Card>
      </div>
    </div>
  );
}
