import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="p-8 max-w-3xl mx-auto">
      {/* HEADER WITH BACK BUTTON */}

      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <h1 className="text-2xl font-semibold">Lecturer Detail</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow-lg border rounded-2xl">
          <CardContent className="p-8 space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">{lecturer.fullName}</h1>
                <p className="text-muted-foreground">{lecturer.email}</p>
              </div>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t">
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
                <p className="font-semibold text-lg">{classes.length}</p>
              </div>
            </div>

            {/* CLASS LIST */}
            <div className="pt-4 border-t">
              <h2 className="font-semibold mb-3">Assigned Classes</h2>

              {classes.length === 0 ? (
                <p className="text-muted-foreground">No classes assigned</p>
              ) : (
                <ul className="grid gap-2">
                  {classes.map((c, index) => (
                    <motion.li
                      key={c.classId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 rounded-lg border hover:bg-muted transition cursor-default"
                    >
                      {c.classCode}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
