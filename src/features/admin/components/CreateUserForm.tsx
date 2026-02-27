import { useState } from "react";

export default function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [jiraUsername, setJiraUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      email,
      githubUsername,
      jiraUsername,
    };

    console.log("New user:", newUser);

    // TODO: call API here

    alert("User created successfully!");

    // reset form
    setEmail("");
    setGithubUsername("");
    setJiraUsername("");
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
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block mb-2 font-medium">GitHub Username</label>
          <input
            type="text"
            placeholder="github_username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Jira */}
        <div>
          <label className="block mb-2 font-medium">Jira Username</label>
          <input
            type="text"
            placeholder="jira_username"
            value={jiraUsername}
            onChange={(e) => setJiraUsername(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
