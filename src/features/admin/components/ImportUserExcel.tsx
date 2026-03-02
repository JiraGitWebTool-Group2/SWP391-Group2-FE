import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { importUsersExcel } from "../services";

export default function ImportUserExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleImport = async () => {
    if (!file) {
      alert("Vui lòng chọn file Excel");
      return;
    }

    try {
      setLoading(true);
      await importUsersExcel(file);
      alert("Import thành công!");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Import thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 text-center border">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <UploadCloud className="text-blue-600" size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Import Users from Excel</h1>

        <p className="text-gray-500 mb-6">
          Upload an Excel file (.xlsx) to add multiple users at once.
        </p>

        <label className="block w-full cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
            <p className="text-gray-600">
              {file ? file.name : "Click to choose file"}
            </p>
          </div>

          <input
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <button
          type="button"
          onClick={handleImport}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Importing..." : "Import File"}
        </button>
      </div>
    </div>
  );
}
