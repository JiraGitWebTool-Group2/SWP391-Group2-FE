import SrsTemplateForm from "../components/SrsTemplateForm";

export function SrsGeneratePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">SRS Generator</h1>
        <p className="text-muted-foreground">
          Create a new Software Requirement Specification document.
        </p>
      </div>

      <SrsTemplateForm />
    </div>
  );
}
