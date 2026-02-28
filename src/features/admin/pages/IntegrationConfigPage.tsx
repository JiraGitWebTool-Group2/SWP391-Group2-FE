import { useParams } from "react-router-dom";
import IntegrationForm from "../components/IntegrationForm";

export default function IntegrationConfigPage() {
  const params = useParams();
  const groupId = params.groupId;

  console.log("Params:", params); // debug

  if (!groupId) {
    return <div className="p-6">Invalid Project ID</div>;
  }

  const id = Number(groupId);

  if (isNaN(id)) {
    return <div className="p-6">Invalid Project ID</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integration - Group {id}</h1>

      <IntegrationForm groupId={id} />
    </div>
  );
}
