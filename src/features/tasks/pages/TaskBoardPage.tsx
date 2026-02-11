import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TaskBoardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Task Board</h1>
      <div className="grid grid-cols-3 gap-4">
        {["To Do", "In Progress", "Done"].map((col) => (
          <Card key={col}>
            <CardHeader>
              <CardTitle className="text-sm">{col}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[1, 2].map((t) => (
                <Card key={t} className="p-2">
                  <p className="text-sm font-medium">Task {t}</p>
                  <p className="text-xs text-muted-foreground">
                    Assigned to Member
                  </p>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
