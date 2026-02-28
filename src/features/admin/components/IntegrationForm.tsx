import { useEffect, useState } from "react";
import { getIntegration, updateIntegration } from "../services";
import { toast } from "react-toastify";

interface Props {
  groupId: number; // groupId = projectId
}

export default function IntegrationForm({ groupId }: Props) {
  const [jiraUrl, setJiraUrl] = useState("");
  const [jiraToken, setJiraToken] = useState("");
  const [githubOrg, setGithubOrg] = useState("");
  const [githubToken, setGithubToken] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [groupId]);

  const loadData = async () => {
    try {
      setLoading(true);

      const jiraRes = await getIntegration(groupId, "jira");
      const githubRes = await getIntegration(groupId, "github");

      if (jiraRes.data) {
        setJiraUrl(jiraRes.data.baseUrl || "");
        setJiraToken(jiraRes.data.token || "");
      }

      if (githubRes.data) {
        setGithubOrg(githubRes.data.org || "");
        setGithubToken(githubRes.data.token || "");
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

      // PUT jira
      await updateIntegration(groupId, {
        provider: "jira",
        baseUrl: jiraUrl,
        token: jiraToken,
      });

      // PUT github
      await updateIntegration(groupId, {
        provider: "github",
        org: githubOrg,
        token: githubToken,
      });

      toast.success("Saved successfully!");
    } catch (err) {
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
