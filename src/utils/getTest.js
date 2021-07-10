import axios from "axios";
// import { QueryClient, QueryClientProvider, useQuery } from "react-query";

// const queryClient = new QueryClient();

export const get_test = () =>
  axios
    .get("/api/user/getAll")
    .then((res) => console.log("server response", res.data));
