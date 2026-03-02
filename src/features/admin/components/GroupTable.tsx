import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getGroups, createGroup, createProjectInGroup } from "../services";
import type { Group } from "../types";

export default function GroupTable() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const [projectName, setProjectName] = useState("");
  const [jiraKey, setJiraKey] = useState("");
  const [githubOrg, setGithubOrg] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (err) {
      console.error("Failed to load groups", err);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await createGroup({ groupName, description });
      setGroupName("");
      setDescription("");
      setShowForm(false);
      loadGroups(); // reload table
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  if (loading) return <div className="p-6">Loading groups...</div>;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg">Group List</h2>
          <Button onClick={() => setShowForm(!showForm)}>Add Group</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowProjectForm(true);
            }}
          >
            Add Project
          </Button>
        </div>

        {showForm && (
          <div className="border p-4 rounded-md space-y-3">
            <input
              className="border p-2 w-full"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <input
              className="border p-2 w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button onClick={handleCreate}>Save</Button>
          </div>
        )}

        {showProjectForm && (
          <div className="border p-4 rounded-md space-y-3 bg-muted/30">
            <h3 className="font-semibold">Create Project</h3>

            <select
              className="border p-2 w-full"
              value={selectedGroupId ?? ""}
              onChange={(e) => setSelectedGroupId(Number(e.target.value))}
            >
              <option value="">Select Group</option>
              {groups.map((g) => (
                <option key={g.groupId} value={g.groupId}>
                  {g.groupName}
                </option>
              ))}
            </select>

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

            <Button
              onClick={async () => {
                if (!selectedGroupId) return;

                await createProjectInGroup(selectedGroupId, {
                  projectName,
                  jiraProjectKey: jiraKey,
                  githubOrg,
                  description: projectDescription,
                });

                setProjectName("");
                setJiraKey("");
                setGithubOrg("");
                setProjectDescription("");
                setShowProjectForm(false);

                alert("Project created!");
              }}
            >
              Save Project
            </Button>
          </div>
        )}

        <table className="w-full border rounded-md">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Group Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {groups.map((group) => (
              <tr key={group.groupId} className="border-t">
                <td className="p-3">{group.groupName}</td>
                <td className="p-3">{group.description}</td>

                <td className="p-3 text-center space-x-2">
                  <Link to={`/admin/groups/${group.groupId}/projects`}>
                    <Button size="sm">Projects</Button>
                  </Link>

                  <Link to={`/admin/groups/${group.groupId}/dashboard`}>
                    <Button size="sm">Dashboard</Button>
                  </Link>

                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}

            {groups.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  No groups found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
