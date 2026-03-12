import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getClassById,
  getLecturersOfClass,
  getStudentsOfClass,
  removeStudentFromClass,
  addStudentsBulk,
  getGroupsByClass,
} from "../services";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import type {
  ClassDetail,
  GroupOfClass,
  Lecturer,
  StudentOfClass,
} from "../types";

/* ================= GROUP TYPE ================= */

export default function AdminClassDetailPage() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null);

  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [students, setStudents] = useState<StudentOfClass[]>([]);
  const [groups, setGroups] = useState<GroupOfClass[]>([]);

  const [error, setError] = useState<string | null>(null);

  /* ================= LOAD CLASS ================= */

  const loadClass = async () => {
    try {
      if (!classId) return;

      const data = await getClassById(Number(classId));
      setClassDetail(data);
    } catch {
      setError("Cannot load class information.");
    }
  };

  /* ================= LOAD LECTURERS ================= */

  const loadLecturers = async () => {
    try {
      if (!classId) return;

      const data = await getLecturersOfClass(Number(classId));

      if (!data) {
        setLecturers([]);
        return;
      }

      setLecturers(Array.isArray(data) ? data : [data]);
    } catch {
      setError("Cannot load lecturers.");
    }
  };

  /* ================= LOAD STUDENTS ================= */

  const loadStudents = async () => {
    try {
      if (!classId) return;

      const data = await getStudentsOfClass(Number(classId));

      if (!data) {
        setStudents([]);
        return;
      }

      const list = Array.isArray(data) ? data : [data];

      const uniqueStudents = Array.from(
        new Map(list.map((s) => [s.studentId, s])).values(),
      );

      setStudents(uniqueStudents);
    } catch {
      setError("Cannot load students.");
    }
  };

  /* ================= LOAD GROUPS ================= */

  const loadGroups = async () => {
    try {
      if (!classId) return;

      const data = await getGroupsByClass(Number(classId));

      if (!data) {
        setGroups([]);
        return;
      }

      setGroups(Array.isArray(data) ? data : [data]);
    } catch {
      setError("Cannot load groups.");
    }
  };

  /* ================= ADD STUDENT ================= */

  const handleAddStudent = async () => {
    try {
      if (!classId) return;

      const input = prompt("Enter Student IDs (comma separated)");

      if (!input) return;

      const ids = input
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id));

      await addStudentsBulk(Number(classId), {
        studentIds: ids,
      });
      await loadStudents();
    } catch {
      setError("Cannot add student");
    }
  };

  /* ================= REMOVE STUDENT ================= */

  const handleRemoveStudent = async (studentId: number) => {
    try {
      if (!classId) return;

      await removeStudentFromClass(Number(classId), studentId);

      await loadStudents();

      setError(null);
    } catch {
      setError("Cannot remove student.");
    }
  };

  /* ================= INIT ================= */

  useEffect(() => {
    loadClass();
    loadLecturers();
    loadStudents();
    loadGroups();
  }, [classId]);

  /* ================= UI ================= */

  return (
    <div className="p-8">
      {/* HEADER */}

      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <h1 className="text-2xl font-semibold">Class Detail</h1>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* ================= CLASS INFO ================= */}

      {classDetail && (
        <div className="mb-8 bg-white border rounded p-4 shadow">
          <h2 className="font-semibold mb-4">Class Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <p>
              <b>Class Name:</b> {classDetail.className}
            </p>

            <p>
              <b>Class Code:</b> {classDetail.classCode}
            </p>

            <p>
              <b>Course:</b> {classDetail.courseCode}
            </p>

            <p>
              <b>Semester:</b> {classDetail.semesterName}
            </p>

            <p>
              <b>Status:</b> {classDetail.status}
            </p>
          </div>
        </div>
      )}

      {/* ================= LECTURERS ================= */}

      <div className="mb-8 bg-white border rounded p-4 shadow">
        <h2 className="font-semibold mb-4">Lecturers</h2>

        {lecturers.length === 0 && (
          <p className="text-gray-500">No lecturers</p>
        )}

        {lecturers.map((l, index) => (
          <div
            key={`${l.lecturerId}-${index}`}
            className="flex justify-between items-center border-t py-3"
          >
            <div>
              <p className="font-medium">{l.lecturerName}</p>
              <p className="text-sm text-gray-500">{l.lecturerEmail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= GROUPS ================= */}

      <div className="mb-8 bg-white border rounded p-4 shadow">
        <h2 className="font-semibold mb-4">Groups</h2>

        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left p-2">Group Name</th>
              <th className="text-left p-2">Project</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {groups.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-gray-500 text-center">
                  No groups
                </td>
              </tr>
            )}

            {groups.map((g, index) => (
              <tr key={`${g.groupId}-${index}`} className="border-t">
                <td className="p-3">{g.groupName}</td>

                <td className="p-3">{g.projectName}</td>

                <td className="p-3 flex gap-2">
                  {g.projectId ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/admin/projects/${g.projectId}/integration`)
                        }
                      >
                        Integration
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(`/admin/projects/${g.projectId}/repository`)
                        }
                      >
                        Repository
                      </Button>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= STUDENTS ================= */}

      <div className="bg-white border rounded shadow">
        <div className="p-4 border-b font-semibold flex justify-between">
          Students
          <Button size="sm" onClick={handleAddStudent}>
            Add Student
          </Button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Group</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-gray-500 text-center">
                  No students
                </td>
              </tr>
            )}

            {students.map((s, index) => (
              <tr key={`${s.studentId}-${index}`} className="border-t">
                <td className="p-3">{s.studentName}</td>

                <td className="p-3">{s.studentEmail}</td>

                <td className="p-3">{s.groupName}</td>

                <td className="p-3 text-right">
                  <Button
                    size="sm"
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleRemoveStudent(s.studentId)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
