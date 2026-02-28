import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getGroups } from "../services";

interface Group {
  groupId: number;
  groupName: string;
  description?: string;
}

export default function GroupTable() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const res = await getGroups();

      console.log("GROUP API:", res.data);

      // Nếu backend trả mảng trực tiếp
      if (Array.isArray(res.data)) {
        setGroups(res.data);
      }
      // Nếu backend trả { data: [...] }
      else if (Array.isArray(res.data.data)) {
        setGroups(res.data.data);
      }
      // Nếu backend trả { items: [...] }
      else if (Array.isArray(res.data.items)) {
        setGroups(res.data.items);
      } else {
        setGroups([]);
      }
    } catch (err) {
      console.error("Failed to load groups", err);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading groups...</div>;
  console.log("Groups state:", groups);
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
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {groups.map((group) => (
              <tr key={group.groupId} className="border-t">
                <td className="p-3">{group.groupName}</td>
                <td className="p-3">{group.description}</td>

                <td className="p-3 text-center space-x-2">
                  <Link to={`/admin/groups/${group.groupId}/integration`}>
                    <Button size="sm" variant="secondary">
                      Integration
                    </Button>
                  </Link>

                  <Button size="sm" variant="outline">
                    Edit
                  </Button>

                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            {groups.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  No groups found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
