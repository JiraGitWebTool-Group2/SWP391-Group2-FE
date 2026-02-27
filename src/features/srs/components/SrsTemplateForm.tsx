import { useState } from "react";

export default function SrsTemplateForm() {
  const Section = ({
    title,
    placeholder,
  }: {
    title: string;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
      <textarea
        className="w-full border rounded-lg p-3 min-h-[120px]"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="space-y-8 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center">
        SWP391 - Software Requirement Specification
      </h2>

      {/* I. Overview */}
      <Section
        title="I.1 Introduction"
        placeholder="Describe system overview, environment, users, assumptions..."
      />

      <Section
        title="I.2 Business Main Flows"
        placeholder="Describe Main-flow 01, 02, 03..."
      />

      <Section
        title="I.3 Business Rules"
        placeholder="BR-01: ... 
BR-02: ..."
      />

      <Section
        title="I.4 Use Cases"
        placeholder="Use case list and descriptions..."
      />

      <Section
        title="I.5 System Functions"
        placeholder="Screen flow, screen details, authorization..."
      />

      {/* II */}
      <Section
        title="II.1 Conceptual ERD"
        placeholder="Describe conceptual ERD..."
      />

      <Section title="II.2 Logical ERD" placeholder="Describe logical ERD..." />

      <Section
        title="II.3 Database Design"
        placeholder="Describe schema, table relationships..."
      />

      {/* III */}
      <Section
        title="III. Functional Requirements"
        placeholder="Describe features, functions, validation rules..."
      />

      <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
        Save SRS
      </button>
    </div>
  );
}
