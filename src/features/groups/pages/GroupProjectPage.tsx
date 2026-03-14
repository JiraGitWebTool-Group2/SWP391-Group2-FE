import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getProjectsByGroup,
  configureIntegration,
  getMyGroup,
} from "../services";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GroupProjectPage() {
  const { groupId } = useParams();

  const [project, setProject] = useState<any>(null);
  const [jiraKey, setJiraKey] = useState("");
  const [githubOrg, setGithubOrg] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      const group = await getMyGroup();
      try {
        const projects = await getProjectsByGroup(group.groupId);

        if (projects.length > 0) {
          const p = projects[0];

          setProject(p);
          setJiraKey(p.jiraProjectKey || "");
          setGithubOrg(p.githubOrg || "");
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadProject();
  }, [groupId]);

  const handleSave = async () => {
    try {
      await configureIntegration(Number(groupId), project.projectId, {
        jiraProjectKey: jiraKey,
        githubOrg: githubOrg,
      });

      toast.success("Integration saved");
    } catch (err) {
      toast.error("Save failed");
    }
  };

  if (!project) return <div>No project</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Project Information</h1>

      <div className="space-y-2">
        <p>
          <b>Name:</b> {project.projectName}
        </p>
        <p>
          <b>Description:</b> {project.description}
        </p>
        <p>
          <b>Requirement:</b> {project.requirement}
        </p>
      </div>

      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Integration</h2>

        <Input
          placeholder="Jira Project Key"
          value={jiraKey}
          onChange={(e) => setJiraKey(e.target.value)}
        />

        <Input
          placeholder="Github Organization"
          value={githubOrg}
          onChange={(e) => setGithubOrg(e.target.value)}
        />

        <Button onClick={handleSave}>Save Integration</Button>
      </div>
    </div>
  );
}
