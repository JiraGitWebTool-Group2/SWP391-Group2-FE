import { useEffect, useState } from "react";
import { getIntegration, updateIntegration } from "../services";
import { toast } from "sonner";

interface Props {
  projectId: number;
}

export default function IntegrationForm({ projectId }: Props) {
  // ✅ JIRA (3 useState như bạn yêu cầu)
  const [baseUrl, setBaseUrl] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [jiraToken, setJiraToken] = useState("");

  // ✅ GITHUB
  const [githubOrg, setGithubOrg] = useState("");
  const [githubToken, setGithubToken] = useState("");

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load Jira
      try {
        const jira = await getIntegration(projectId, "JIRA");
        if (jira) {
          setBaseUrl(jira.baseUrl || "");
          setProjectKey(jira.projectKey || "");
          setJiraToken(jira.token || "");
        }
      } catch {}

      // Load GitHub
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
    <div className="space-y-6">
      {/* JIRA */}
      <div className="border p-4 rounded space-y-3">
        <h3 className="font-bold">Jira</h3>

        <input
          className="border p-2 w-full"
          placeholder="Base URL"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Project Key"
          value={projectKey}
          onChange={(e) => setProjectKey(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Token"
          value={jiraToken}
          onChange={(e) => setJiraToken(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2" onClick={saveJira}>
          Save
        </button>
      </div>

      {/* GITHUB */}
      <div className="border p-4 rounded space-y-3">
        <h3 className="font-bold">GitHub</h3>

        <input
          className="border p-2 w-full"
          placeholder="Organization"
          value={githubOrg}
          onChange={(e) => setGithubOrg(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Token"
          value={githubToken}
          onChange={(e) => setGithubToken(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2" onClick={saveGithub}>
          Save
        </button>
      </div>
    </div>
  );
}
