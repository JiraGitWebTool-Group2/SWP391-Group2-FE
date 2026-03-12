import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Link2, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  return (
    <div className="w-full min-h-screen p-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

        <p className="text-gray-500 mt-1">
          Manage academic projects, lecturers and integrations.
        </p>
      </div>

      {/* DASHBOARD HERO */}
      <div className="mb-12 flex justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
          className="w-40 opacity-70"
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* GROUPS */}
        <motion.div whileHover={{ y: -5 }}>
          <Card className="rounded-2xl shadow-md hover:shadow-xl transition bg-white/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <Users />
              </div>

              <CardTitle className="text-lg">Manage Groups</CardTitle>
            </CardHeader>

            <CardContent className="text-gray-600 text-sm">
              Create, edit and monitor student groups.
            </CardContent>
          </Card>
        </motion.div>

        {/* LECTURERS */}
        <motion.div whileHover={{ y: -5 }}>
          <Card className="rounded-2xl shadow-md hover:shadow-xl transition bg-white/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <BookOpen />
              </div>

              <CardTitle className="text-lg">Manage Lecturers</CardTitle>
            </CardHeader>

            <CardContent className="text-gray-600 text-sm">
              Add and assign lecturers to groups.
            </CardContent>
          </Card>
        </motion.div>

        {/* ASSIGN */}
        <motion.div whileHover={{ y: -5 }}>
          <Card className="rounded-2xl shadow-md hover:shadow-xl transition bg-white/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <Settings />
              </div>

              <CardTitle className="text-lg">Assign Lecturer</CardTitle>
            </CardHeader>

            <CardContent className="text-gray-600 text-sm">
              Assign lecturers to student groups.
            </CardContent>
          </Card>
        </motion.div>

        {/* INTEGRATION */}
        <motion.div whileHover={{ y: -5 }}>
          <Card className="rounded-2xl shadow-md hover:shadow-xl transition bg-white/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                <Link2 />
              </div>

              <CardTitle className="text-lg">Integration Config</CardTitle>
            </CardHeader>

            <CardContent className="text-gray-600 text-sm">
              Configure Jira & GitHub integration.
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
