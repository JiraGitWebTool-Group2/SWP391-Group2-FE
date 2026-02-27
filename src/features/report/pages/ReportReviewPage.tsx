export default function ReportReviewPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Review Report</h1>

      <div className="bg-white rounded-xl shadow border p-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Sprint 1</h2>
          <p className="text-gray-500 text-sm">Submitted by Group A</p>
        </div>

        <Section title="Summary">
          This sprint implemented authentication and group CRUD.
        </Section>

        <Section title="Details">
          Login, role routing, and report system integration completed.
        </Section>

        <div>
          <label className="block font-medium mb-2">Lecturer Feedback</label>
          <textarea
            rows={4}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write feedback..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Reject
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}
