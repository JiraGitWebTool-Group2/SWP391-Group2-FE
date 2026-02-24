import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GroupTable() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">Group List</h2>
          <Button>Add Group</Button>
        </div>

        <table className="w-full border rounded-md">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Group Name</th>
              <th className="p-3 text-left">Members</th>
              <th className="p-3 text-left">Lecturer</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">Group A</td>
              <td className="p-3">5</td>
              <td className="p-3">Dr. Nguyen</td>
              <td className="p-3 text-center space-x-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
