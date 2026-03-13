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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="p-8 space-y-8 bg-muted/30 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Detail</h1>
          <p className="text-muted-foreground text-sm">
            Manage class information, lecturers, groups and students
          </p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* ================= CLASS INFO ================= */}
      {classDetail && (
        <Card>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-5 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Class Code</p>
              <p className="font-semibold">{classDetail.classCode}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="secondary">{classDetail.status}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================= LECTURERS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Lecturers</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {lecturers.length === 0 && (
            <p className="text-muted-foreground text-sm">No lecturers</p>
          )}

          {lecturers.map((l, index) => (
            <div
              key={`${l.lecturerId}-${index}`}
              className="flex justify-between items-center border rounded-lg p-4 hover:bg-muted/40 transition"
            >
              <div>
                <p className="font-medium">{l.lecturerName}</p>
                <p className="text-sm text-muted-foreground">
                  {l.lecturerEmail}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ================= GROUPS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Groups</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {groups.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground"
                    >
                      No groups
                    </TableCell>
                  </TableRow>
                )}

                {groups.map((g, index) => (
                  <TableRow key={`${g.groupId}-${index}`}>
                    <TableCell className="font-medium">{g.groupName}</TableCell>

                    <TableCell className="align-middle">
                      {g.projectName ? (
                        <Badge variant="secondary">{g.projectName}</Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {g.projectId ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-primary/10 hover:border-primary hover:text-primary transition bg-amber-500"
                              onClick={() =>
                                navigate(
                                  `/admin/projects/${g.projectId}/integration`,
                                )
                              }
                            >
                              Integration
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-primary/10 hover:border-primary hover:text-primary transition bg-amber-500"
                              onClick={() =>
                                navigate(
                                  `/admin/projects/${g.projectId}/repository`,
                                )
                              }
                            >
                              Repository
                            </Button>
                          </>
                        ) : (
                          "-"
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ================= STUDENTS ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Students</CardTitle>

          <Button
            size="sm"
            className="px-4 bg-blue-500 text-white hover:bg-primary/90 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200"
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {students.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No students
                    </TableCell>
                  </TableRow>
                )}

                {students.map((s, index) => (
                  <TableRow key={`${s.studentId}-${index}`}>
                    <TableCell className="font-medium">
                      {s.studentName}
                    </TableCell>

                    <TableCell>{s.studentEmail}</TableCell>

                    <TableCell>
                      {s.groupName ? (
                        <Badge variant="outline">{s.groupName}</Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200"
                        onClick={() => handleRemoveStudent(s.studentId)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
