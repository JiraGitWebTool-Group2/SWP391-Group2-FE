import { useNavigate, useParams } from "react-router-dom";
import RepositoryForm from "../components/RepositoryForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useProjectStore } from "@/stores/project.store";

export default function RepositoryPage() {
  const { projectId } = useParams();
  const currentProjectId = useProjectStore((s) => s.currentProjectId);
  const navigate = useNavigate();

  const projectIdNumber =
    currentProjectId ?? (projectId ? Number(projectId) : null);

  if (!projectIdNumber || isNaN(projectIdNumber)) {
    return <div className="p-6">No project selected</div>;
  }
  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-semibold">
          Repository - Project {projectIdNumber}
        </h1>
      </div>

      <RepositoryForm
        projectId={Number(projectId)}
        mode="create"
        onSuccess={() => {}}
      />
    </div>
  );
}
