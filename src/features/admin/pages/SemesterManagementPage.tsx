import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SemesterTable from "../components/SemesterTable";
import CreateSemesterForm from "../components/CreateSemesterForm";
import EditSemesterForm from "../components/EditSemesterForm";
import type { Semester } from "../types";
import { deleteSemester, getSemesters } from "../services";

export default function SemesterManagementPage() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  const loadSemesters = async () => {
    try {
      const data = await getSemesters();
      setSemesters(data);
    } catch (err) {
      console.error("Failed to load semesters", err);
    }
  };

  useEffect(() => {
    loadSemesters();
  }, []);

  const handleClickSemester = (id: number) => {
    navigate(`/admin/semesters/${id}/classes`);
  };

  const handleCreateSuccess = () => {
    loadSemesters();
    setShowForm(false);
  };

  const handleUpdateSuccess = () => {
    loadSemesters();
    setEditingSemester(null);
  };

  const handleDeleteSemester = async (id: number) => {
    const confirmDelete = confirm("Delete this semester?");
    if (!confirmDelete) return;

    try {
      await deleteSemester(id);
      loadSemesters();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Semester Management</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Semester
        </button>
      </div>

      <SemesterTable
        semesters={semesters}
        onClickSemester={handleClickSemester}
        onDeleteSemester={handleDeleteSemester}
        onEditSemester={setEditingSemester}
      />

      {showForm && (
        <CreateSemesterForm
          onClose={() => setShowForm(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {editingSemester && (
        <EditSemesterForm
          semester={editingSemester}
          onClose={() => setEditingSemester(null)}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
