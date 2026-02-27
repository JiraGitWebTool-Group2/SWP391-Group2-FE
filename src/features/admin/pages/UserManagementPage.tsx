import { useState } from "react";
import ImportUserExcel from "../components/ImportUserExcel";
import CreateUserForm from "../components/CreateUserForm";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<"import" | "add">("import");

  return (
    <div className="min-h-[70vh] flex items-start justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-8 text-center">User Management</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("import")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "import"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Import Users
            </button>

            <button
              onClick={() => setActiveTab("add")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "add"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Add User
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 transition-all duration-300">
          {activeTab === "import" && (
            <div className="animate-fadeIn">
              <ImportUserExcel />
            </div>
          )}

          {activeTab === "add" && (
            <div className="animate-fadeIn">
              <CreateUserForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
