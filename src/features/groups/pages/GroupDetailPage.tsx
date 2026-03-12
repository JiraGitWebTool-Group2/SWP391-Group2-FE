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
} from "../services";

import type { Group, Project, GroupStudent, ClassStudent } from "../types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useAuthStore } from "@/stores/auth.store";
import { ArrowLeft } from "lucide-react";

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
  const [jiraKey, setJiraKey] = useState("");
  const [githubOrg, setGithubOrg] = useState("");
  const [description, setDescription] = useState("");

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

      setSelectedStudentId(null);
      setSelectedRoleId(3);
    } catch (err) {
      console.error(err);
      alert("Add student failed");
    }
  };

  const handleRemoveStudent = async (userId: number) => {
    if (!confirm("Remove this student from group?")) return;

    await removeStudentFromGroup(Number(groupId), userId);

    await loadStudents();
  };

  const handleCreateProject = async () => {
    if (!groupId || !user) return;

    try {
      await createProjectInGroup(Number(groupId), {
        projectName,
        jiraKey,
        githubOrg,
        description,
        createdByUserId: user.userId,
      });

      await loadProjects();

      setProjectName("");
      setJiraKey("");
      setGithubOrg("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Create project failed");
    }
  };

  const availableStudents = classStudents.filter(
    (cs) => !students.some((gs) => gs.userId === cs.studentId),
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <h1 className="text-2xl font-bold">{group?.groupName}</h1>
      </div>

      {/* STUDENTS */}
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
                      onClick={() => handleRemoveStudent(s.userId)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ADD STUDENT */}
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

      {/* PROJECTS */}
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
                      <p className="font-medium">{p.projectName}</p>

                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Jira: {p.jiraProjectKey}</span>
                        <span>Github: {p.githubOrg}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* CREATE PROJECT */}
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <Input
            placeholder="Jira Key"
            value={jiraKey}
            onChange={(e) => setJiraKey(e.target.value)}
          />

          <Input
            placeholder="Github Org"
            value={githubOrg}
            onChange={(e) => setGithubOrg(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleCreateProject}>Create Project</Button>
        </CardContent>
      </Card>
    </div>
  );
}
