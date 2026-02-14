import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, CheckCircle2, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function GroupListPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br 
    from-orange-50 via-rose-50 to-violet-50
    dark:from-slate-950 dark:via-slate-900 dark:to-slate-900
    p-10 space-y-12"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1
            className="text-4xl font-bold tracking-tight 
          bg-gradient-to-r from-rose-500 via-orange-500 to-violet-500 
          bg-clip-text text-transparent"
          >
            Groups Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Monitor and manage student project groups efficiently
          </p>
        </div>

        <Button
          size="lg"
          className="gap-2 text-white shadow-xl
          bg-gradient-to-r from-orange-500 to-rose-500
          hover:scale-105 hover:shadow-2xl
          transition-all duration-300"
        >
          <Plus size={18} />
          Create Group
        </Button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Total Groups",
            icon: <Users size={36} className="text-violet-500" />,
          },
          {
            title: "Active",
            icon: <Clock size={36} className="text-orange-500" />,
          },
          {
            title: "Completed",
            icon: <CheckCircle2 size={36} className="text-rose-500" />,
          },
        ].map((item) => (
          <Card
            key={item.title}
            className="rounded-3xl
            bg-white/70 dark:bg-slate-900/60
            backdrop-blur-xl
            border border-white/40 dark:border-slate-800
            shadow-lg hover:shadow-2xl
            hover:-translate-y-1
            transition-all duration-300"
          >
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <div className="mt-3 h-10 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              </div>
              {item.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TABS */}
      <Tabs defaultValue="all">
        <TabsList
          className="grid w-full md:w-[420px] grid-cols-3
        bg-white/70 dark:bg-slate-900/60
        backdrop-blur-md
        shadow-md rounded-xl p-1"
        >
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-white/70 dark:bg-slate-900/60
              backdrop-blur-md border border-slate-200 dark:border-slate-800
              focus:ring-2 focus:ring-rose-300"
            />
          </div>
        ))}
      </div>

      {/* GROUP CARD */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          className="group rounded-3xl
          bg-white/80 dark:bg-slate-900/60
          backdrop-blur-xl
          border border-slate-200 dark:border-slate-800
          shadow-lg hover:shadow-2xl
          hover:-translate-y-1
          transition-all duration-300"
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-slate-800 dark:text-white">
              Group Name
            </CardTitle>
            <Badge className="bg-orange-100 text-orange-600">Active</Badge>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
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
