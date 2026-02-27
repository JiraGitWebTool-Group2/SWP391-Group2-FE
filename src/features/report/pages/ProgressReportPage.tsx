export default function ProgressReportPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Progress Overview</h1>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Reports" value="24" />
        <StatCard title="Completed" value="18" color="green" />
        <StatCard title="Pending Review" value="6" color="yellow" />
      </div>

      {/* Progress List */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>

        <div className="space-y-4">
          <ProgressItem title="Sprint 1" percent={100} />
          <ProgressItem title="Sprint 2" percent={70} />
          <ProgressItem title="Sprint 3" percent={40} />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color = "blue",
}: {
  title: string;
  value: string;
  color?: string;
}) {
  const colorMap: any = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="bg-white rounded-xl shadow border p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-2xl font-bold mt-2 ${colorMap[color]}`}>{value}</p>
    </div>
  );
}

function ProgressItem({ title, percent }: { title: string; percent: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span>{title}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
