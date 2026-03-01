import { useEffect, useState } from "react";
import { getIntegration, updateIntegration } from "../services";
import { toast } from "react-toastify";

interface Props {
  groupId: number; // groupId = projectId
}

export default function IntegrationForm({ groupId }: Props) {
  const [jiraUrl, setJiraUrl] = useState("");
  const [jiraToken, setJiraToken] = useState("");
  const [jiraProjectKey, setJiraProjectKey] = useState("");

  const [githubOrg, setGithubOrg] = useState("");
  const [githubToken, setGithubToken] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [groupId]);

  const loadData = async () => {
    setLoading(true);

    try {
      // JIRA
      try {
        const jiraRes = await getIntegration(groupId, "JIRA");
        setJiraUrl(jiraRes.data.baseUrl || "");
        setJiraToken(jiraRes.data.token || "");
        setJiraProjectKey(jiraRes.data.projectKey || "");
      } catch (err: any) {
        if (err.response?.status !== 404) {
          throw err;
        }
      }

      // GITHUB
      try {
        const githubRes = await getIntegration(groupId, "GITHUB");
        setGithubOrg(githubRes.data.org || "");
        setGithubToken(githubRes.data.token || "");
      } catch (err: any) {
        if (err.response?.status !== 404) {
          throw err;
        }
      }
    } catch (err) {
      toast.error("Failed to load integration");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Validate JIRA project key
      if (jiraUrl || jiraToken || jiraProjectKey) {
        if (!jiraProjectKey) {
          toast.error("Jira Project Key is required");
          return;
        }

        await updateIntegration(groupId, {
          provider: "JIRA",
          baseUrl: jiraUrl,
          projectKey: jiraProjectKey,
          token: jiraToken,
        });
      }

      // GITHUB
      if (githubOrg || githubToken) {
        await updateIntegration(groupId, {
          provider: "GITHUB",
          org: githubOrg,
          token: githubToken,
        });
      }

      toast.success("Saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-xl">
      {/* Jira */}
      <div className="border p-4 rounded space-y-3">
        <h2 className="font-semibold">Jira</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Jira Base URL"
          value={jiraUrl}
          onChange={(e) => setJiraUrl(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Jira Project Key"
          value={jiraProjectKey}
          onChange={(e) => setJiraProjectKey(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Jira Token"
          value={jiraToken}
          onChange={(e) => setJiraToken(e.target.value)}
        />
      </div>

      {/* GitHub */}
      <div className="border p-4 rounded space-y-3">
        <h2 className="font-semibold">GitHub</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Organization"
          value={githubOrg}
          onChange={(e) => setGithubOrg(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="GitHub Token"
          value={githubToken}
          onChange={(e) => setGithubToken(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
