"use client";
import { useState, useEffect } from "react";
import type {
  CreateOrUpdateRepositoryRequest,
  RepositoryResponse,
} from "../types";
import { createRepository, updateRepository } from "../services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Props {
  projectId: number;
  mode: "create" | "edit";
  repository?: RepositoryResponse;
  onSuccess: () => void;
}
export default function RepositoryForm({
  projectId,
  mode,
  repository,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState<CreateOrUpdateRepositoryRequest>({
    repoName: "",
    repoUrl: "",
    defaultBranch: "main",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (mode === "edit" && repository) {
      setFormData({
        repoName: repository.repoName,
        repoUrl: repository.repoUrl,
        defaultBranch: repository.defaultBranch,
      });
    }
  }, [mode, repository]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "create") {
        await createRepository(projectId, formData);
      } else {
        if (!repository) return;
        await updateRepository(projectId, repository.id, formData);
      }
      onSuccess();
    } catch (error: any) {
      console.error(error);
      alert("Failed ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {" "}
      <div className="space-y-2">
        {" "}
        <Label>Repository Name</Label>{" "}
        <Input
          name="repoName"
          value={formData.repoName}
          onChange={handleChange}
          required
        />{" "}
      </div>{" "}
      <div className="space-y-2">
        {" "}
        <Label>Repository URL</Label>{" "}
        <Input
          name="repoUrl"
          value={formData.repoUrl}
          onChange={handleChange}
          required
        />{" "}
      </div>{" "}
      <div className="space-y-2">
        {" "}
        <Label>Default Branch</Label>{" "}
        <Input
          name="defaultBranch"
          value={formData.defaultBranch}
          onChange={handleChange}
          required
        />{" "}
      </div>{" "}
      <Button className="w-full" disabled={loading}>
        {" "}
        {loading
          ? "Processing..."
          : mode === "create"
            ? "Create Repository"
            : "Update Repository"}{" "}
      </Button>{" "}
    </form>
  );
}
