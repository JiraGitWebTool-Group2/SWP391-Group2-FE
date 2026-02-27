import { useParams } from "react-router-dom";
import { IncompleteRequirementList } from "../components/IncompleteRequirementList";
import { TraceabilityTable } from "../components/TraceabilityTable";

export default function SrsEditorPage() {
  const { id } = useParams();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Edit SRS</h1>
        <p className="text-muted-foreground">Editing document ID: {id}</p>
      </div>

      {/* Fake editor area */}
      <div className="border rounded-xl p-6 bg-card shadow-sm">
        <h2 className="font-semibold mb-4">Document Content</h2>
        <textarea
          className="w-full min-h-[200px] border rounded-lg p-3"
          placeholder="Edit your SRS content here..."
        />
      </div>

      {/* Incomplete Requirement */}
      <IncompleteRequirementList />

      {/* Traceability Matrix */}
      <TraceabilityTable />
    </div>
  );
}
