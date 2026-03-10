import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ClassTable from "../components/ClassTable";
import CreateClassForm from "../components/CreateClassForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus } from "lucide-react";

import {
  createClass,
  deleteClass,
  getClasses,
  updateClass,
  getLecturers,
  getSemesterById,
} from "../services";

import type { Class, AllLecturer, Semester } from "../types";

export default function ClassManagementPage() {
  const { semesterId } = useParams();
  const navigate = useNavigate();

  const [classes, setClasses] = useState<Class[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const [allLecturers, setAllLecturers] = useState<AllLecturer[]>([]);
  const [semester, setSemester] = useState<Semester | null>(null);

  /* ================= LOAD DATA ================= */

  const loadClasses = async () => {
    const data = await getClasses();

    if (semesterId) {
      setClasses(
        data.filter((c: Class) => c.semesterId === Number(semesterId)),
      );
    } else {
      setClasses(data);
    }
  };

  const loadSemester = async () => {
    if (!semesterId) return;

    const data = await getSemesterById(Number(semesterId));
    setSemester(data);
  };

  const loadLecturers = async () => {
    const data = await getLecturers();
    setAllLecturers(data);
  };

  useEffect(() => {
    loadClasses();
    loadLecturers();
    loadSemester();
  }, [semesterId]);

  /* ================= CREATE ================= */

  const handleCreateClass = async (data: any) => {
    if (!semesterId) return;

    await createClass({
      semesterId: Number(semesterId),
      ...data,
    });

    await loadClasses();
    setShowForm(false);
  };

  /* ================= DELETE ================= */

  const handleDeleteClass = async (id: number) => {
    if (!confirm("Delete this class?")) return;

    await deleteClass(id);
    await loadClasses();
  };

  /* ================= UPDATE ================= */

  const handleEditClass = async () => {
    if (!editingClass) return;

    const payload = {
      semesterId: Number(editingClass.semesterId),
      classCode: editingClass.classCode,
      courseCode: editingClass.courseCode,
      className: editingClass.className,
      lecturerUserId: editingClass.lecturerUserId,
      status: editingClass.status,
    };

    await updateClass(editingClass.classId, payload);

    setEditingClass(null);
    await loadClasses();
  };

  /* ================= UI ================= */

  return (
    <div className="p-8">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/admin/semesters")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <h1 className="text-2xl font-semibold">
            {semester ? `Classes - ${semester.name}` : "Classes"}
          </h1>
        </div>

        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Class
        </Button>
      </div>

      {/* CREATE FORM */}

      {showForm && (
        <CreateClassForm
          onCreate={handleCreateClass}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* TABLE */}

      <ClassTable
        classes={classes}
        lecturers={allLecturers}
        onDelete={handleDeleteClass}
        onEdit={(c) => setEditingClass(c)}
        onView={(id) => navigate(`/admin/classes/${id}`)}
      />

      {/* ================= EDIT MODAL ================= */}

      {editingClass && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[420px] p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">Edit Class</h2>

            {/* CLASS NAME */}

            <div>
              <Label>Class Name</Label>
              <Input
                value={editingClass.className}
                onChange={(e) =>
                  setEditingClass({
                    ...editingClass,
                    className: e.target.value,
                  })
                }
              />
            </div>

            {/* COURSE CODE */}

            <div>
              <Label>Course Code</Label>
              <Input
                value={editingClass.courseCode}
                onChange={(e) =>
                  setEditingClass({
                    ...editingClass,
                    courseCode: e.target.value,
                  })
                }
              />
            </div>

            {/* CLASS CODE */}

            <div>
              <Label>Class Code</Label>
              <Input
                value={editingClass.classCode}
                onChange={(e) =>
                  setEditingClass({
                    ...editingClass,
                    classCode: e.target.value,
                  })
                }
              />
            </div>

            {/* LECTURER SELECT */}

            <div>
              <Label>Lecturer</Label>

              <select
                className="border rounded p-2 w-full"
                value={editingClass.lecturerUserId ?? ""}
                onChange={(e) =>
                  setEditingClass({
                    ...editingClass,
                    lecturerUserId: Number(e.target.value),
                  })
                }
              >
                <option value="">Select Lecturer</option>

                {allLecturers.map((l) => (
                  <option key={l.lecturerId} value={l.lecturerId}>
                    {l.fullName} ({l.email})
                  </option>
                ))}
              </select>
            </div>

            {/* STATUS */}

            <div>
              <Label>Status</Label>

              <select
                className="border rounded p-2 w-full"
                value={editingClass.status}
                onChange={(e) =>
                  setEditingClass({
                    ...editingClass,
                    status: e.target.value,
                  })
                }
              >
                <option value="PLANNING">PLANNING</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditingClass(null)}>
                Cancel
              </Button>

              <Button onClick={handleEditClass}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
