import axios from "axios";
// import { QueryClient, QueryClientProvider, useQuery } from "react-query";

// const queryClient = new QueryClient();

export const get_test = () =>
  axios
    .get("/api/get_test")
    .then((res) => console.log("server response", res.data));
