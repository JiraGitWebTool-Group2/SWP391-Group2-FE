import { useParams } from "react-router-dom";
import RepositoryForm from "../components/RepositoryForm";

export default function RepositoryPage() {
  const { projectId } = useParams();

  if (!projectId) return <p>Project not found</p>;

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Repository</h1>

      <RepositoryForm
        projectId={Number(projectId)}
        mode="create"
        onSuccess={() => {}}
      />
    </div>
  );
}
