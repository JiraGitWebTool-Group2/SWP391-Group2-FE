import { useParams } from "react-router-dom";
import RepositoryForm from "../components/RepositoryForm";
export default function RepositoryManagementPage() {
  const { groupId } = useParams();
  if (!groupId) return null;
  return (
    <div className="p-4 max-w-xl">
      {" "}
      <h1 className="text-xl font-semibold mb-4">
        {" "}
        Manage Repositories - Group {groupId}{" "}
      </h1>{" "}
      <RepositoryForm
        projectId={Number(groupId)}
        mode="create"
        onSuccess={() => {
          console.log("Repository created");
        }}
      />{" "}
    </div>
  );
}
