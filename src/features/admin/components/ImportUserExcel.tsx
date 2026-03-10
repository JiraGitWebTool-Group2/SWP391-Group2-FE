import { UploadCloud } from "lucide-react";
import { useState, useRef } from "react";
import { importUsersExcel } from "../services";

export default function ImportUserExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setErrors([]);
    setResult(null);
  };

  const handleImport = async () => {
    if (!file) {
      alert("Vui lòng chọn file Excel");
      return;
    }

    try {
      setLoading(true);

      const data = await importUsersExcel(file); // data luôn

      setResult(data);
      setErrors(data.errors || []);

      if (data.inserted > 0) {
        alert(`Import thành công ${data.inserted} user`);
      }

      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <UploadCloud className="text-blue-600" size={32} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Import Users from Excel</h1>

        <p className="text-gray-500 mb-6">
          Upload an Excel file (.xlsx) to add multiple users at once.
        </p>

        {/* File Upload */}
        <label className="block w-full cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
            <p className="text-gray-600">
              {file ? file.name : "Click to choose file"}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Button */}
        <button
          type="button"
          onClick={handleImport}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Importing..." : "Import File"}
        </button>

        {/* Result summary */}
        {result && (
          <div className="mt-6 bg-gray-50 border rounded-xl p-4 text-left">
            <h3 className="font-semibold mb-2">Import Result</h3>

            <p>Total Rows: {result.totalRows}</p>
            <p className="text-green-600">Inserted: {result.inserted}</p>
            <p className="text-yellow-600">Skipped: {result.skipped}</p>
          </div>
        )}

        {/* Error list */}
        {errors.length > 0 && (
          <div className="mt-6 text-left bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="font-semibold text-red-600 mb-2">Import Errors</h3>

            <ul className="text-sm text-red-500 space-y-1">
              {errors.map((err, index) => (
                <li key={index}>
                  Row {err.rowNumber} - {err.username}: {err.error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
