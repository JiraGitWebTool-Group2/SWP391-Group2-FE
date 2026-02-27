import * as XLSX from "xlsx";
import { importUsers } from "../services";
import { UploadCloud } from "lucide-react";

export default function ImportUserExcel() {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const users = XLSX.utils.sheet_to_json(sheet);

    await importUsers(users);

    alert("Import thành công!");
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
              Click to choose file or drag and drop
            </p>
          </div>

          <input type="file" accept=".xlsx, .xls" className="hidden" />
        </label>

        <button
          type="button"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Import File
        </button>
      </div>
    </div>
  );
}
