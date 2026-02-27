export function TraceabilityTable() {
  const mockMatrix = [
    { requirement: "FR-01", testCase: "TC-01" },
    { requirement: "FR-02", testCase: "TC-02" },
  ];

  return (
    <div className="border rounded-xl p-6 bg-card shadow-sm">
      <h2 className="font-semibold mb-4">Traceability Matrix</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="border p-2 text-left">Requirement</th>
            <th className="border p-2 text-left">Test Case</th>
          </tr>
        </thead>
        <tbody>
          {mockMatrix.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{row.requirement}</td>
              <td className="border p-2">{row.testCase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
