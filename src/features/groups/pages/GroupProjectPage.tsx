import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProjectsByGroup, getMyGroup } from "../services";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupProjectPage() {
  const navigate = useNavigate();

  const [project, setProject] = useState<any>(null);
  const [group, setGroup] = useState<any>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const g = await getMyGroup();
        setGroup(g);

        const projects = await getProjectsByGroup(g.groupId);

        if (projects.length > 0) {
          setProject(projects[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadProject();
  }, []);

  if (!project) return <div>No project</div>;

  return (
    <div className="p-8 space-y-6 max-w-3xl mx-auto">
      {/* ===== GROUP NAME ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Class : {group?.classCode}</CardTitle>
        </CardHeader>

        <CardContent>Lecturer : {group?.lecturerName}</CardContent>
        <CardContent>Group : {group?.groupName}</CardContent>
      </Card>

      {/* ===== PROJECT INFO ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p>
            <b>Name:</b> {project.projectName}
          </p>

          <p>
            <b>Description:</b> {project.description}
          </p>

          <p>
            <b>Requirement:</b> {project.requirement || "No requirement"}
          </p>
        </CardContent>
      </Card>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex gap-4 justify-center">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate(`/projects/${project.projectId}/integration`)}
        >
          Integration
        </Button>

        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate(`/projects/${project.projectId}/repository`)}
        >
          Repository
        </Button>
      </div>
    </div>
  );
}
