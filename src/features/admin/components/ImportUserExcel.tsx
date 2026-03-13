import { UploadCloud } from "lucide-react";
import { useState, useRef } from "react";
import { importUsersExcel } from "../services";
import * as XLSX from "xlsx";

export default function ImportUserExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setErrors([]);
    setResult(null);
  };

  // validate excel
  const validateExcel = async (file: File) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    const validationErrors: any[] = [];

    rows.forEach((row, index) => {
      const rowNumber = index + 2;

      const email = (row.Email || "").toString().trim().toLowerCase();
      const role = (row.Role || "").toString().trim().toUpperCase();

      if (!email || !role) {
        validationErrors.push({
          rowNumber,
          email,
          error: "Missing email or role",
        });
        return;
      }

      if (!["STUDENT", "LECTURER", "ADMIN"].includes(role)) {
        validationErrors.push({
          rowNumber,
          email,
          error: "Invalid role",
        });
        return;
      }

      // check lecturer domain
      if (role === "LECTURER" && !email.endsWith("@fpt.edu.vn")) {
        validationErrors.push({
          rowNumber,
          email,
          error: "Lecturer email must be @fpt.edu.vn",
        });
        return;
      }

      // check student domain
      if (
        role === "STUDENT" &&
        !email.endsWith("@gmail.com") &&
        !email.endsWith("@fpt.edu.vn")
      ) {
        validationErrors.push({
          rowNumber,
          email,
          error: "Student email must be gmail or fpt",
        });
      }
    });

    return {
      totalRows: rows.length,
      errors: validationErrors,
    };
  };

  // import
  const handleImport = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const validation = await validateExcel(file);

      // lỗi
      setErrors(validation.errors);

      // gọi API
      const data = await importUsersExcel(file);

      const successCount = validation.totalRows - validation.errors.length;

      setResult({
        totalRows: validation.totalRows,
        inserted: successCount,
        skipped: validation.errors.length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 text-center border">
        {/* icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <UploadCloud className="text-blue-600" size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Import Student and Lecturer</h1>

        <p className="text-gray-500 mb-6">
          Upload Excel file (.xlsx) to import users
        </p>

        {/* upload */}
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

        {/* button */}
        <button
          onClick={handleImport}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Importing..." : "Import File"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-green-50 border border-green-300 rounded-xl p-4 text-left">
            <h3 className="font-semibold text-green-700 mb-2">Import Result</h3>

            <p>Total Rows: {result.totalRows}</p>
            <p className="text-green-700">
              Added Successfully: {result.inserted}
            </p>
            <p className="text-red-600">Failed: {result.skipped}</p>
          </div>
        )}

        {/* ERRORS */}
        {errors.length > 0 && (
          <div className="mt-6 bg-red-50 border border-red-300 rounded-xl p-4 text-left">
            <h3 className="font-semibold text-red-700 mb-2">Import Errors</h3>

            <ul className="text-sm text-red-600 space-y-1">
              {errors.map((err, index) => (
                <li key={index}>
                  Row {err.rowNumber} - {err.email} : {err.error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
