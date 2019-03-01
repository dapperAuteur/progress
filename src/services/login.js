import axios from "axios";

export const login = cred => {
  return axios.post("http://localhost:5000/api/auth", cred);
};
