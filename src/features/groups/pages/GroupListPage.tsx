import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function GroupListPage() {
  return (
    <div className="p-8 space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Groups Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage student project groups efficiently
          </p>
        </div>

        <Button size="lg" className="gap-2 shadow-md">
          <Plus size={18} />
          Create Group
        </Button>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="rounded-3xl shadow-md hover:shadow-xl transition duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Groups</p>
              <p className="text-4xl font-bold mt-2">--</p>
            </div>
            <Users size={36} className="text-primary opacity-80" />
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-md hover:shadow-xl transition duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-4xl font-bold mt-2">--</p>
            </div>
            <Clock size={36} className="text-yellow-500 opacity-80" />
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-md hover:shadow-xl transition duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-4xl font-bold mt-2">--</p>
            </div>
            <CheckCircle2 size={36} className="text-green-500 opacity-80" />
          </CardContent>
        </Card>
      </div>

      {/* FILTER TABS */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input placeholder="Search groups..." />
        <Input placeholder="Filter by lecturer..." />
        <Input placeholder="Filter by semester..." />
      </div>

      {/* GROUP GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="rounded-3xl border hover:border-primary transition duration-300 hover:shadow-2xl group">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="group-hover:text-primary transition">
              Group Name
            </CardTitle>
            <Badge className="bg-yellow-500/10 text-yellow-600">Active</Badge>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Project: --</p>
            <p>Leader: --</p>
            <p>Lecturer: --</p>
            <p>Members: --</p>

            <div className="flex gap-3 pt-4">
              <Link to="/groups/1">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </Link>

              <Button size="sm" variant="ghost">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
