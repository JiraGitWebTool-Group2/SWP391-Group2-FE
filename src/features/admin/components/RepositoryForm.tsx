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
import { GitBranch } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="max-w-2xl mx-auto mt-6 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3">
        <GitBranch className="w-5 h-5 text-muted-foreground" />

        <div>
          <CardTitle>
            {mode === "create" ? "Create Repository" : "Update Repository"}
          </CardTitle>

          <CardDescription>
            Connect your Git repository to this project
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Repository Name</Label>
            <Input
              name="repoName"
              value={formData.repoName}
              onChange={handleChange}
              placeholder="example-repository"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Repository URL</Label>
            <Input
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              placeholder="https://github.com/your-org/repository"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Default Branch</Label>
            <Input
              name="defaultBranch"
              value={formData.defaultBranch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading
                ? "Processing..."
                : mode === "create"
                  ? "Create Repository"
                  : "Update Repository"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
