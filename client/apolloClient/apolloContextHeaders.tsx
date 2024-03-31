import { useTokenContext } from "../src/lib/context/tokenContext/useTokenContext";

export const apolloContextHeaders = () => {
  const { token } = useTokenContext();
  const context = {
    headers: {
      "Access-Control-Allow-Origin": `${process.env.CLIENT_URL}`,
      authorization: `Bearer ${token}`,
    },
  };

  return context;
};
