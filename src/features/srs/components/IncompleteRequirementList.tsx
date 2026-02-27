export function IncompleteRequirementList() {
  const mockData = [
    { id: "FR-01", status: "Missing description" },
    { id: "FR-05", status: "No priority assigned" },
  ];

  return (
    <div className="border rounded-xl p-6 bg-card shadow-sm">
      <h2 className="font-semibold mb-4 text-red-500">
        Incomplete Requirements
      </h2>

      {mockData.length === 0 ? (
        <p className="text-muted-foreground">All requirements are complete.</p>
      ) : (
        <ul className="space-y-2">
          {mockData.map((item) => (
            <li
              key={item.id}
              className="border rounded-lg p-3 bg-red-50 text-sm"
            >
              <strong>{item.id}</strong> — {item.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
