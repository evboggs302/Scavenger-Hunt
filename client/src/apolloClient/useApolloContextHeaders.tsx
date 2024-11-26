import { useTokenContext } from "@lib/context/TokenContext";

export const useApolloContextHeaders = () => {
  const { token } = useTokenContext();
  const context = {
    headers: {
      "Access-Control-Allow-Origin": `${process.env.CLIENT_URL}`,
      authorization: `Bearer ${token}`,
    },
  };

  return context;
};
