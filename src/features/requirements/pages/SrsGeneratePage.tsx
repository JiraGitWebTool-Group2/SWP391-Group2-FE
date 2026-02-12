import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function SrsGeneratePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SRS Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Project" />
            </SelectTrigger>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Scope (Backlog / Sprint)" />
            </SelectTrigger>
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex gap-2">
              <Checkbox /> Functional Requirements
            </label>
            <label className="flex gap-2">
              <Checkbox /> Non-Functional Requirements
            </label>
            <label className="flex gap-2">
              <Checkbox /> Business Rules
            </label>
            <label className="flex gap-2">
              <Checkbox /> Traceability Matrix
            </label>
          </div>
          <Button>Generate SRS</Button>
        </CardContent>
      </Card>
    </div>
  );
}
