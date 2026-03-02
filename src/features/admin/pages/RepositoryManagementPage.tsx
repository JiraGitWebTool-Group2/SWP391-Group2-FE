import { useParams } from "react-router-dom";
import { useProjectStore } from "@/stores/project.store";
import RepositoryForm from "../components/RepositoryForm";

export default function RepositoryManagementPage() {
  const { projectId } = useParams();
  const currentProjectId = useProjectStore((s) => s.currentProjectId);

  const projectIdNumber =
    currentProjectId ?? (projectId ? Number(projectId) : null);

  if (!projectIdNumber || isNaN(projectIdNumber)) {
    return <div className="p-4">No project selected</div>;
  }

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">
        Manage Repositories - Project {projectIdNumber}
      </h1>

      <RepositoryForm
        projectId={projectIdNumber}
        mode="create"
        onSuccess={() => {
          console.log("Repository created");
        }}
      />
    </div>
  );
}
