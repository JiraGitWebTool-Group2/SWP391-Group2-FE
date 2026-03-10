import { useState } from "react";
import { createUser } from "../services";
import { toast } from "sonner";
import type { UserRole } from "../types";

export default function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Creating user...");

    try {
      setLoading(true);

      await createUser({
        email,
        fullName,
        password: "defaultpassword",
        role: role as UserRole,
      });

      toast.success("User created successfully", { id: toastId });

      setEmail("");
      setFullName("");
      setRole("STUDENT");
    } catch (error: any) {
      console.error(error);

      if (error.response?.data) {
        toast.error(error.response.data, { id: toastId });
      } else {
        toast.error("Create user failed", { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 border">
      <h2 className="text-xl font-bold mb-6 text-center">Add User</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="STUDENT">Student</option>
            <option value="LECTURER">Lecturer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
