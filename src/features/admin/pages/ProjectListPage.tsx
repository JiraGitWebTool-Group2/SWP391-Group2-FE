import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectsByGroup, createProjectInGroup } from "../services";
import type { Project } from "../types";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/stores/project.store";

export default function ProjectListPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const setProject = useProjectStore((s) => s.setProject);

  const [projects, setProjects] = useState<Project[]>([]);

  const [projectName, setProjectName] = useState("");
  const [jiraKey, setJiraKey] = useState("");
  const [githubOrg, setGithubOrg] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const groupIdNumber = Number(groupId);

  useEffect(() => {
    if (!isNaN(groupIdNumber)) {
      loadProjects();
    }
  }, [groupId]);

  const loadProjects = async () => {
    try {
      const data = await getProjectsByGroup(groupIdNumber);
      setProjects(data);
    } catch (err) {
      console.error("Load projects failed", err);
      setProjects([]);
    }
  };

  const handleCreate = async () => {
    if (!projectName.trim()) return;

    try {
      await createProjectInGroup(groupIdNumber, {
        projectName: projectName,
        jiraProjectKey: jiraKey,
        githubOrg: githubOrg,
        description: projectDescription,
      });

      // reset form
      setProjectName("");
      setJiraKey("");
      setGithubOrg("");
      setProjectDescription("");

      loadProjects();
    } catch (err) {
      console.error("Create project failed", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Projects - Group {groupId}</h1>

      <div className="border p-4 rounded space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Jira Project Key"
          value={jiraKey}
          onChange={(e) => setJiraKey(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Github Org"
          value={githubOrg}
          onChange={(e) => setGithubOrg(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />

        <Button onClick={handleCreate}>Create Project</Button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.projectId} className="border-t">
              <td className="p-3">{project.projectName}</td>
              <td className="p-3 text-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setProject(project);
                    navigate(
                      `/admin/projects/${project.projectId}/integration`,
                    );
                  }}
                >
                  Integration
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setProject(project);
                    navigate(
                      `/admin/projects/${project.projectId}/repositories`,
                    );
                  }}
                >
                  Repositories
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
