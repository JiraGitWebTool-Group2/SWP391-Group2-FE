import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getGroups,
  getProjectsByGroup,
  getStudentsOfGroup,
  addStudentToGroup,
  removeStudentFromGroup,
  getStudentsOfClass,
  createProjectInGroup,
  updateProject,
  deleteProject,
} from "../services";

import type { Group, Project, GroupStudent, ClassStudent } from "../types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useAuthStore } from "@/stores/auth.store";
import { ArrowLeft } from "lucide-react";

import { toast } from "sonner";

export default function GroupDetailPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const [group, setGroup] = useState<Group | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [students, setStudents] = useState<GroupStudent[]>([]);
  const [classStudents, setClassStudents] = useState<ClassStudent[]>([]);

  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [selectedRoleId, setSelectedRoleId] = useState<number>(3);

  const [projectName, setProjectName] = useState("");
  const [projectCode, setprojectCode] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");

  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (!groupId) return;

    loadGroup();
    loadProjects();
    loadStudents();
  }, [groupId]);

  const loadGroup = async () => {
    const groups = await getGroups();
    const g = groups.find((x) => x.groupId === Number(groupId));
    setGroup(g ?? null);

    if (g?.classId) {
      loadClassStudents(g.classId);
    }
  };

  const loadProjects = async () => {
    const data = await getProjectsByGroup(Number(groupId));
    setProjects(data);
  };

  const loadStudents = async () => {
    const data = await getStudentsOfGroup(Number(groupId));

    const uniqueStudents = Array.from(
      new Map(data.map((s) => [s.userId, s])).values(),
    );

    setStudents(uniqueStudents);
  };

  const loadClassStudents = async (classId: number) => {
    const data = await getStudentsOfClass(classId);

    const unique = Array.from(
      new Map(data.map((s: any) => [s.studentId, s])).values(),
    ) as ClassStudent[];

    setClassStudents(unique);
  };

  const handleAddStudent = async () => {
    if (!groupId || !selectedStudentId) return;

    try {
      await addStudentToGroup(
        Number(groupId),
        selectedStudentId,
        selectedRoleId,
      );

      await loadStudents();

      toast.success("Student added to group successfully");

      setSelectedStudentId(null);
      setSelectedRoleId(3);
    } catch (err) {
      console.error(err);
      alert("Add student failed");

      toast.error("Add student failed");
    }
  };

  const handleRemoveStudent = async (userId: number) => {
    if (!confirm("Remove this student from group?")) return;

    try {
      await removeStudentFromGroup(Number(groupId), userId);

      await loadStudents();

      toast.success("Student removed from group successfully");
    } catch (err) {
      console.error(err);

      toast.error("Remove student failed");
    }
  };

  const handleCreateProject = async () => {
    if (!groupId || !user) return;

    try {
      await createProjectInGroup(Number(groupId), {
        projectCode,
        projectName,
        description,
        requirement,
      });

      await loadProjects();

      setprojectCode("");
      setProjectName("");
      setDescription("");
      setRequirement("");

      toast.success("Project created successfully");
    } catch (err) {
      console.error(err);
      alert("Create project failed");

      toast.error("Create project failed");
    }
  };

  const handleEditProject = (p: Project) => {
    setEditingProjectId(p.projectId);
    setprojectCode(p.projectCode);
    setProjectName(p.projectName);
    setDescription(p.description ?? "");
    setRequirement(p.requirement ?? "");
  };

  const handleUpdateProject = async () => {
    if (!groupId || !editingProjectId) return;

    try {
      await updateProject(Number(groupId), editingProjectId, {
        projectCode,
        projectName,
        description,
        requirement,
      });

      setEditingProjectId(null);

      setprojectCode("");
      setProjectName("");
      setDescription("");
      setRequirement("");

      await loadProjects(); // load lại sau khi reset

      toast.success("Project updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Update project failed");
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!groupId) return;

    if (!confirm("Delete this project?")) return;

    try {
      await deleteProject(Number(groupId), projectId);

      await loadProjects();

      toast.success("Project deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Delete project failed");
    }
  };

  const availableStudents = classStudents.filter(
    (cs) => !students.some((gs) => gs.userId === cs.studentId),
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <h1 className="text-2xl font-bold">{group?.groupName}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.userId} className="border-b hover:bg-muted/40">
                  <td className="p-3 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {s.fullName?.charAt(0)}
                    </div>

                    {s.fullName}
                  </td>

                  <td className="p-3 text-muted-foreground">{s.email}</td>

                  <td className="p-3">
                    <Badge
                      variant={
                        s.groupRole === "TEAM_LEADER" ? "default" : "secondary"
                      }
                    >
                      {s.groupRole === "TEAM_LEADER" ? "Leader" : "Member"}
                    </Badge>
                  </td>

                  <td className="text-right p-3">
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-black"
                      onClick={() => handleRemoveStudent(s.userId)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-2 mt-4">
            <select
              value={selectedStudentId ?? ""}
              onChange={(e) =>
                setSelectedStudentId(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="border rounded px-2 py-1"
            >
              <option value="">Select student</option>

              {availableStudents.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.studentName} ({s.studentEmail})
                </option>
              ))}
            </select>

            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={2}>Team Leader</option>
              <option value={3}>Team Member</option>
            </select>

            <Button onClick={handleAddStudent} disabled={!selectedStudentId}>
              Add Student
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>

        <CardContent>
          {projects.length === 0 ? (
            <p className="text-muted-foreground">No project yet</p>
          ) : (
            <div className="grid gap-3">
              {projects.map((p) => (
                <Card key={p.projectId}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{p.projectCode}</p>
                      <p className="font-medium">{p.projectName}</p>

                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <p>
                          Description: {p.description} <br />
                          Requirement: {p.requirement}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProject(p)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-black"
                        onClick={() => handleDeleteProject(p.projectId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {editingProjectId ? "Update Project" : "Create Project"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input
            placeholder="Project Code"
            value={projectCode}
            onChange={(e) => setprojectCode(e.target.value)}
          />
          <Input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Requirement"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          />

          {editingProjectId ? (
            <Button onClick={handleUpdateProject}>Update Project</Button>
          ) : (
            <Button onClick={handleCreateProject}>Create Project</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
