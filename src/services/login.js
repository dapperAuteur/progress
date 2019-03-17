import axios from "axios";

export const login = cred => {
  const apiURL = process.env.REACT_APP_API_URL;
  return axios.post(apiURL + "/api/auth", cred);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
