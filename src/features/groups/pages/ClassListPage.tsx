import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GraduationCap, ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getClassesOfLecturer, getLecturerById } from "../services";
import { authService } from "@/features/auth/services";

type Class = {
  classId: number;
  classCode: string;
};

export default function ClassListPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [lecturerName, setLecturerName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // lấy user hiện tại
        const res = await authService.getMe();
        const user = res.data;

        console.log("current user:", user);

        // gọi 2 API cùng lúc
        const [classesData, lecturerData] = await Promise.all([
          getClassesOfLecturer(user.userId),
          getLecturerById(user.userId),
        ]);

        console.log("classes API:", classesData);
        console.log("lecturer API:", lecturerData);

        setClasses(classesData);
        setLecturerName(lecturerData.fullName);
      } catch (error) {
        console.error("Failed to load classes", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen p-10 space-y-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          My Classes
        </h1>

        <p className="text-sm text-slate-500">
          Manage and access all classes you are teaching.
        </p>

        {lecturerName && (
          <p className="text-sm text-indigo-600 font-medium">
            Lecturer: {lecturerName}
          </p>
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-20 text-slate-500">
          Loading classes...
        </div>
      )}

      {/* CLASS GRID */}
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.length === 0 ? (
            <div className="col-span-full text-center py-20 space-y-3">
              <GraduationCap className="mx-auto h-10 w-10 text-slate-400" />

              <p className="text-slate-500 text-sm">
                You have not been assigned to any classes
              </p>
            </div>
          ) : (
            classes.map((c) => (
              <Card
                key={c.classId}
                className="group rounded-2xl border bg-white/90 backdrop-blur shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <GraduationCap className="h-4 w-4" />
                    </div>

                    <CardTitle className="text-lg">{c.classCode}</CardTitle>
                  </div>

                  <Badge variant="secondary">Class</Badge>
                </CardHeader>

                <CardContent className="space-y-4 text-sm">
                  <p className="text-slate-500">
                    Class Code:{" "}
                    <span className="font-medium text-slate-700">
                      {c.classCode}
                    </span>
                  </p>

                  <p className="text-slate-500">
                    Lecturer:{" "}
                    <span className="font-medium text-indigo-600">
                      {lecturerName}
                    </span>
                  </p>

                  <Link
                    to={`/classes/${c.classId}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
