import { useEffect, useState } from "react";
import { getIntegration, updateIntegration } from "../services";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Github, Link } from "lucide-react";

interface Props {
  projectId: number;
}

export default function IntegrationForm({ projectId }: Props) {
  const [baseUrl, setBaseUrl] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [jiraToken, setJiraToken] = useState("");

  const [githubOrg, setGithubOrg] = useState("");
  const [githubToken, setGithubToken] = useState("");

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      try {
        const jira = await getIntegration(projectId, "JIRA");
        if (jira) {
          setBaseUrl(jira.baseUrl || "");
          setProjectKey(jira.projectKey || "");
          setJiraToken(jira.token || "");
        }
      } catch {}

      try {
        const github = await getIntegration(projectId, "GITHUB");
        if (github) {
          setGithubOrg(github.org || "");
          setGithubToken(github.token || "");
        }
      } catch {}
    } catch {
      toast.error("Failed to load integration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  const saveJira = async () => {
    try {
      await updateIntegration(projectId, {
        provider: "JIRA",
        baseUrl: baseUrl,
        projectKey: projectKey,
        token: jiraToken,
      });

      toast.success("Jira saved");
    } catch {
      toast.error("Failed to save Jira integration");
    }
  };

  const saveGithub = async () => {
    try {
      await updateIntegration(projectId, {
        provider: "GITHUB",
        org: githubOrg,
        token: githubToken,
      });

      toast.success("Github saved");
    } catch {
      toast.error("Failed to save Github integration");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* JIRA */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Link className="w-5 h-5 text-blue-500" />
          <CardTitle>Jira Integration</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Base URL</Label>
            <Input
              placeholder="https://your-domain.atlassian.net"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Project Key</Label>
            <Input
              placeholder="PROJ"
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>API Token</Label>
            <Input
              type="password"
              placeholder="Jira API Token"
              value={jiraToken}
              onChange={(e) => setJiraToken(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={saveJira}>
            Save Jira Integration
          </Button>
        </CardContent>
      </Card>

      {/* GITHUB */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Github className="w-5 h-5" />
          <CardTitle>GitHub Integration</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Organization</Label>
            <Input
              placeholder="your-github-org"
              value={githubOrg}
              onChange={(e) => setGithubOrg(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Personal Access Token</Label>
            <Input
              type="password"
              placeholder="GitHub Token"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={saveGithub}>
            Save GitHub Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
