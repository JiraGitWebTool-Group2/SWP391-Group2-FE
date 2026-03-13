import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

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
  getGroups,
  getClasses,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../services";

import type { Group } from "../types";

export default function GroupListPage() {
  const user = useAuthStore((state) => state.user);
  const isLecturer = user?.systemRole?.toUpperCase() === "LECTURER";

  const [groups, setGroups] = useState<Group[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const [editGroupName, setEditGroupName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editClassId, setEditClassId] = useState("");

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const data = await getGroups();
      setGroups(data);
    } catch (err) {
      console.error("Load groups error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (err) {
      console.error("Load classes error", err);
    }
  };

  useEffect(() => {
    fetchGroups();
    if (isLecturer) fetchClasses();
  }, [isLecturer]);

  const handleCreateSubmit = async () => {
    if (!newGroupName || !selectedClassId) {
      alert("Please input group name and select class");
      return;
    }

    try {
      setIsCreating(true);

      await createGroup({
        groupName: newGroupName,
        description: newDescription,
        classId: Number(selectedClassId),
      });

      setNewGroupName("");
      setNewDescription("");
      setSelectedClassId("");
      setIsDialogOpen(false);

      fetchGroups();
    } catch {
      alert("Create group failed");
    } finally {
      setIsCreating(false);
    }
  };

  const openEditDialog = (group: Group) => {
    setEditingGroup(group);
    setEditGroupName(group.groupName);
    setEditDescription(group.description || "");
    setEditClassId(String(group.classId || ""));
    setIsEditOpen(true);
  };

  const handleUpdateGroup = async () => {
    if (!editingGroup) return;

    try {
      await updateGroup(editingGroup.groupId, {
        groupName: editGroupName,
        description: editDescription,
        classId: Number(editClassId),
      });

      setIsEditOpen(false);
      fetchGroups();
    } catch {
      alert("Update failed");
    }
  };

  const handleDeleteGroup = async () => {
    if (!editingGroup) return;
    if (!confirm("Delete this group?")) return;

    try {
      await deleteGroup(editingGroup.groupId);
      setIsEditOpen(false);
      fetchGroups();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen p-10 space-y-10 bg-gradient-to-br from-orange-50 via-rose-50 to-violet-50">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-600">Groups Management</h1>

        {isLecturer && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={18} />
                Create Group
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
                <DialogDescription>Enter group information</DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <select
                  className="w-full border rounded p-2"
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                >
                  <option value="">Select Class</option>

                  {classes.map((c) => (
                    <option key={c.classId} value={c.classId}>
                      {c.className}
                    </option>
                  ))}
                </select>

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

      {/* GROUP LIST */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : groups.length === 0 ? (
          <p>No groups</p>
        ) : (
          groups.map((group) => (
            <Card key={group.groupId} className="hover:shadow-md transition">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>{group.groupName}</CardTitle>
                <Badge variant="secondary">Active</Badge>
              </CardHeader>

              <CardContent className="space-y-2 text-sm">
                <p className="font-semibold text-blue-600">
                  Class: {group.className || group.classId || "None"}
                </p>

                {/* <p>Description: {group.description || "--"}</p> */}

                {group.createdAt && (
                  <p className="text-muted-foreground">
                    Created:{" "}
                    {new Date(group.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                )}

                <div className="flex gap-3 pt-3">
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/groups/${group.groupId}`}>View</Link>
                  </Button>

                  <Button asChild size="sm" variant="secondary">
                    <Link to={`/groups/${group.groupId}/dashboard`}>
                      Dashboard
                    </Link>
                  </Button>
                  {isLecturer && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(group)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* EDIT GROUP */}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              value={editGroupName}
              onChange={(e) => setEditGroupName(e.target.value)}
              placeholder="Group name"
            />

            <select
              className="w-full border rounded p-2"
              value={editClassId}
              onChange={(e) => setEditClassId(e.target.value)}
            >
              <option value="">Select class</option>

              {classes.map((c) => (
                <option key={c.classId} value={c.classId}>
                  {c.className}
                </option>
              ))}
            </select>

            <Input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={handleDeleteGroup}>
              Delete
            </Button>

            <Button onClick={handleUpdateGroup}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
