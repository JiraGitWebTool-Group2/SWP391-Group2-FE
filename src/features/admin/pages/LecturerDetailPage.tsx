import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { getLecturerById, getClassesOfLecturer } from "../services";

export default function LecturerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lecturer, setLecturer] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      const lecturerData = await getLecturerById(Number(id));
      setLecturer(lecturerData);

      const classData = await getClassesOfLecturer(Number(id));
      setClasses(classData);
    };

    load();
  }, [id]);

  if (!lecturer)
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading lecturer...
      </div>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold">Lecturer Detail</h1>
          <p className="text-sm text-muted-foreground">
            View lecturer information and assigned classes
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card className="shadow-sm border rounded-xl">
          <CardContent className="p-8 space-y-8">
            {/* PROFILE */}
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">{lecturer.fullName}</h2>
                <p className="text-muted-foreground">{lecturer.email}</p>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-6 border-t pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{lecturer.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{lecturer.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Assigned Classes
                </p>

                <Badge variant="secondary" className="mt-1 text-sm">
                  {classes.length} classes
                </Badge>
              </div>
            </div>

            {/* CLASS LIST */}
            <div className="border-t pt-6">
              <h2 className="font-semibold mb-4">Assigned Classes</h2>

              {classes.length === 0 ? (
                <p className="text-muted-foreground">No classes assigned</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {classes.map((c, index) => (
                    <motion.div
                      key={c.classId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border rounded-lg px-4 py-3 hover:bg-muted transition"
                    >
                      <p className="font-medium">{c.classCode}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
