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
import { GitBranch, Loader2 } from "lucide-react";
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
    <Card className="max-w-2xl mx-auto mt-8 shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="p-2 rounded-md bg-muted">
          <GitBranch className="w-5 h-5 text-muted-foreground" />
        </div>

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
          {/* Repository Name */}
          <div className="space-y-2">
            <Label>Repository Name</Label>
            <Input
              name="repoName"
              value={formData.repoName}
              onChange={handleChange}
              placeholder="e.g. project-management-system"
              className="focus-visible:ring-2"
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
              placeholder="e.g. https://github.com/your-org/project"
              className="focus-visible:ring-2"
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
              placeholder="e.g. main"
              className="focus-visible:ring-2"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              className="border-red-500 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all duration-200 hover:shadow-md hover:scale-[1.03]"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="outline"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 border-primary text-primary bg-primary/10 hover:bg-primary/20 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200 bg-green-400"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}

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
