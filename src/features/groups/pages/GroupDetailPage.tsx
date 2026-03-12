import { useParams } from "react-router-dom";
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

import { useAuthStore } from "@/stores/auth.store";

export default function GroupDetailPage() {
  const { groupId } = useParams();
  const user = useAuthStore((s) => s.user);

  const [group, setGroup] = useState<Group | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [students, setStudents] = useState<GroupStudent[]>([]);
  const [classStudents, setClassStudents] = useState<ClassStudent[]>([]);

  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [selectedRoleId, setSelectedRoleId] = useState<number>(3);

  /* ================= PROJECT STATE ================= */

  const [projectName, setProjectName] = useState("");
  const [jiraKey, setJiraKey] = useState("");
  const [githubOrg, setGithubOrg] = useState("");
  const [description, setDescription] = useState("");

  /* ================= LOAD DATA ================= */

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

    // remove duplicate students
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

  /* ================= ADD STUDENT ================= */

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

  /* ================= REMOVE STUDENT ================= */

  const handleRemoveStudent = async (userId: number) => {
    if (!confirm("Remove this student from group?")) return;

    await removeStudentFromGroup(Number(groupId), userId);

    await loadStudents();
  };

  /* ================= CREATE PROJECT ================= */

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

  /* ================= FILTER STUDENTS ================= */

  const availableStudents = classStudents.filter(
    (cs) => !students.some((gs) => gs.userId === cs.studentId),
  );

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* GROUP NAME */}

      <h1 className="text-2xl font-bold">{group?.groupName}</h1>

      {/* STUDENTS TABLE */}

      <div>
        <h2 className="text-xl font-semibold mb-2">Students</h2>

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.userId} className="border-b">
                <td className="p-2">{s.fullName}</td>
                <td>{s.email}</td>
                <td>{s.groupRole === "TEAM_LEADER" ? "Leader" : "Member"}</td>

                <td className="text-right">
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
          >
            <option value={2}>Team Leader</option>
            <option value={3}>Team Member</option>
          </select>

          <Button onClick={handleAddStudent} disabled={!selectedStudentId}>
            Add Student
          </Button>
        </div>
      </div>

      {/* PROJECT LIST */}

      <div>
        <h2 className="text-xl font-semibold mb-2">Projects</h2>

        {projects.length === 0 ? (
          <p>No project yet</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Project</th>
                <th>Jira</th>
                <th>Github</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((p) => (
                <tr key={p.projectId} className="border-b">
                  <td className="p-2">{p.projectName}</td>
                  <td>{p.jiraProjectKey}</td>
                  <td>{p.githubOrg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CREATE PROJECT */}

      <div className="border p-4 rounded space-y-2">
        <h2 className="font-semibold">Create Project</h2>

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
      </div>
    </div>
  );
}
