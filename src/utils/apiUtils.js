import axios from "axios";

export const sendLogin = async (uname, pw) =>
  await axios.post("/api/user/login", { userName: uname, password: pw });

export const fetchActiveUser = () => {
  axios.get("/api/user/getAll").then((res) => res.data);
};
