import axios from "axios";

export const importUsers = async (users: any[]) => {
  return axios.post("/admin/users/import", users);
};

export const createUser = async (data: {
  email: string;
  userGit: string;
  userJira: string;
}) => {
  return axios.post("/admin/users", data);
};
