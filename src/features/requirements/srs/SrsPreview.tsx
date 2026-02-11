import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export function SrsPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Software Requirement Specification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="font-semibold">Functional Requirements</h3>
          <ul className="list-disc pl-6">
            <li>FR-01: The system shall ...</li>
          </ul>
        </section>
        <section>
          <h3 className="font-semibold">Traceability Matrix</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SRS ID</TableHead>
                <TableHead>Jira Issue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>FR-01</TableCell>
                <TableCell>PROJ-123</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </CardContent>
    </Card>
  );
}
