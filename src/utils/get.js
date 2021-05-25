import axios from "axios";

export const get_test = () =>
  axios
    .get("/api/get_test")
    .then((res) => console.log("server response", res.data));
