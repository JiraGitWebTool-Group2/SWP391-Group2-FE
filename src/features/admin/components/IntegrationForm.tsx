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
    if (!baseUrl || !projectKey || !jiraToken) {
      toast.error("All Jira fields are required");
      return;
    }
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
    if (!githubOrg || !githubToken) {
      toast.error("All GitHub fields are required");
      return;
    }
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

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="h-[280px] animate-pulse" />
        <Card className="h-[280px] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* JIRA */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-md bg-blue-100">
            <Link className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <CardTitle>Jira Integration</CardTitle>
            <p className="text-sm text-muted-foreground">
              Connect your Jira workspace to sync issues
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Base URL</Label>
            <Input
              placeholder="Enter Jira base URL"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Project Key</Label>
            <Input
              placeholder="Enter project key"
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>API Token</Label>
            <Input
              type="password"
              placeholder="Enter API token"
              value={jiraToken}
              onChange={(e) => setJiraToken(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-amber-400"
            onClick={saveJira}
          >
            <Link className="w-4 h-4" />
            Save Jira Integration
          </Button>
        </CardContent>
      </Card>

      {/* GITHUB */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-md bg-gray-100">
            <Github className="w-5 h-5 text-black" />
          </div>

          <div>
            <CardTitle>GitHub Integration</CardTitle>
            <p className="text-sm text-muted-foreground">
              Connect GitHub organization for repository sync
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Organization</Label>
            <Input
              placeholder="Enter GitHub organization"
              value={githubOrg}
              onChange={(e) => setGithubOrg(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Personal Access Token</Label>
            <Input
              type="password"
              placeholder="Enter GitHub personal access token"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
            />
          </div>

          <Button
            className="w-full flex items-center justify-center gap-2 bg-amber-400"
            variant="outline"
            onClick={saveGithub}
          >
            <Github className="w-4 h-4" />
            Save GitHub Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
