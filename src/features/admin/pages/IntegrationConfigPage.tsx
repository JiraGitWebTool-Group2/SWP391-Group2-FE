import { useParams } from "react-router-dom";
import { useProjectStore } from "@/stores/project.store";
import IntegrationForm from "../components/IntegrationForm";

export default function IntegrationConfigPage() {
  const { projectId } = useParams();
  const currentProjectId = useProjectStore((s) => s.currentProjectId);

  const projectIdNumber =
    currentProjectId ?? (projectId ? Number(projectId) : null);

  if (!projectIdNumber || isNaN(projectIdNumber)) {
    return <div className="p-6">No project selected</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Integration - Project {projectIdNumber}
      </h1>
      <IntegrationForm projectId={projectIdNumber} />
    </div>
  );
}
