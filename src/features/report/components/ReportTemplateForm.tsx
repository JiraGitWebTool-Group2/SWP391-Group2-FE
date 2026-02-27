import { useState } from "react";

type Section = {
  id: string;
  title: string;
  content: string;
};

export function ReportTemplateForm() {
  const [sections, setSections] = useState<Section[]>([
    { id: "1", title: "", content: "" },
  ]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        title: "",
        content: "",
      },
    ]);
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleChange = (
    id: string,
    field: "title" | "content",
    value: string,
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
      ),
    );
  };

  return (
    <div className="bg-white shadow border rounded-xl p-8 space-y-6">
      <h2 className="text-2xl font-bold">Report Template Form</h2>

      {/* Report Info */}
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Report Title</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter report title"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            rows={3}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Short description..."
          />
        </div>
      </div>

      {/* Dynamic Sections */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Sections</h3>

        {sections.map((section, index) => (
          <div
            key={section.id}
            className="border rounded-lg p-5 space-y-4 relative"
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">Section {index + 1}</p>
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSection(section.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              value={section.title}
              onChange={(e) =>
                handleChange(section.id, "title", e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Section title"
            />

            <textarea
              rows={4}
              value={section.content}
              onChange={(e) =>
                handleChange(section.id, "content", e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Section content"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddSection}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          + Add Section
        </button>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Save Template
        </button>
      </div>
    </div>
  );
}
