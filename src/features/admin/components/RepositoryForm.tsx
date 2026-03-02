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
import { toast } from "sonner";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await createRepository(projectId, formData);

        toast.success("Repository created successfully 🎉");

        // Reset form sau khi tạo thành công
        setFormData({
          repoName: "",
          repoUrl: "",
          defaultBranch: "main",
        });
      } else {
        if (!repository) return;

        await updateRepository(projectId, repository.id, formData);

        toast.success("Repository updated successfully 🎉");
      }

      onSuccess();
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message || "Failed to save repository";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Repository Name */}
      <div className="space-y-2">
        <Label>Repository Name</Label>
        <Input
          name="repoName"
          value={formData.repoName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Repository URL */}
      <div className="space-y-2">
        <Label>Repository URL</Label>
        <Input
          name="repoUrl"
          value={formData.repoUrl}
          onChange={handleChange}
          required
        />
      </div>

      {/* Default Branch */}
      <div className="space-y-2">
        <Label>Default Branch</Label>
        <Input
          name="defaultBranch"
          value={formData.defaultBranch}
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? "Processing..."
          : mode === "create"
            ? "Create Repository"
            : "Update Repository"}
      </Button>
    </form>
  );
}
