import { setContext } from "@apollo/client/link/context";
import React from "react";
import { useUserContext } from "./user/context/useUserContext";

export const apolloContextWithHeaders = () => {
  const { token } = useUserContext();
  const context = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": `${process.env.CLIENT_URL}`,
        authorization: `Bearer ${token}`,
      },
    };
  });

  return context;
};
