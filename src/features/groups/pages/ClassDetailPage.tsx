import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAuthStore } from "@/stores/auth.store";

import {
  createGroup,
  deleteGroup,
  getGroupsByClass,
  getClassById,
} from "../services";

import type { Group } from "../types";

export default function ClassDetailPage() {
  const { classId } = useParams();

  const user = useAuthStore((state) => state.user);
  const isLecturer = user?.systemRole?.toUpperCase() === "LECTURER";

  const [groups, setGroups] = useState<Group[]>([]);
  const [classInfo, setClassInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      if (!classId) return;
      setIsLoading(true);
      const data = await getGroupsByClass(Number(classId));
      setGroups(data);
    } catch (err) {
      console.error("Load groups error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClassInfo = async () => {
    try {
      if (!classId) return;
      const data = await getClassById(Number(classId));
      setClassInfo(data);
    } catch (err) {
      console.error("Load class error", err);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchClassInfo();
  }, [classId]);

  const handleCreateSubmit = async () => {
    if (!newGroupName) {
      alert("Please input group name");
      return;
    }

    try {
      setIsCreating(true);

      await createGroup({
        groupName: newGroupName,
        description: newDescription,
        classId: Number(classId),
      });

      setNewGroupName("");
      setNewDescription("");
      setIsDialogOpen(false);

      fetchGroups();
    } catch (err) {
      console.error(err);
      alert("Create group failed");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    if (!confirm("Delete this group?")) return;

    try {
      await deleteGroup(groupId);
      fetchGroups();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen p-10 space-y-10 bg-gradient-to-br from-orange-50 via-rose-50 to-violet-50">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl shadow-sm hover:shadow-md"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 bg-clip-text text-transparent">
              Groups Management
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage groups belonging to this class
            </p>
          </div>
        </div>

        {isLecturer && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-sm hover:shadow-md transition rounded-xl">
                <Plus size={18} />
                Create Group
              </Button>
            </DialogTrigger>

            <DialogContent className="rounded-2xl bg-white">
              <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
                <DialogDescription>
                  Enter information for the new group
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <Input
                  placeholder="Group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />

                <Input
                  placeholder="Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>

                <Button onClick={handleCreateSubmit} disabled={isCreating}>
                  {isCreating ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* CLASS INFO */}

      {classInfo && (
        <Card className="rounded-2xl border bg-white/90 backdrop-blur shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-800">
                Class: {classInfo.className}
              </p>

              <p className="text-sm text-slate-500">
                All groups belonging to this class are listed below
              </p>
            </div>

            <Badge variant="outline" className="text-sm">
              {groups.length} Groups
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* GROUP LIST */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <p className="text-slate-500">Loading groups...</p>
        ) : groups.length === 0 ? (
          <div className="col-span-full text-center py-20 space-y-4">
            <Users className="mx-auto h-10 w-10 text-slate-400" />

            <p className="text-slate-500 text-sm">
              No groups created for this class yet
            </p>
          </div>
        ) : (
          groups.map((group) => (
            <Card
              key={group.groupId}
              className="group rounded-2xl border bg-white/90 backdrop-blur shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                    <Users className="h-4 w-4" />
                  </div>

                  <CardTitle className="text-lg">{group.groupName}</CardTitle>
                </div>

                <Badge variant="secondary" className="rounded-full">
                  Active
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                {group.createdAt && (
                  <p className="text-muted-foreground">
                    Created:{" "}
                    {new Date(group.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-lg"
                  >
                    <Link to={`/groups/${group.groupId}`}>View</Link>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="rounded-lg"
                  >
                    <Link to={`/groups/${group.groupId}/dashboard`}>
                      Dashboard
                    </Link>
                  </Button>

                  {isLecturer && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteGroup(group.groupId)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
