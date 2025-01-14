import { ApolloLink } from "@apollo/client";

export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": `${process.env.CLIENT_URL}`,
        authorization: localStorage.getItem("BEARER_TOKEN"),
      },
    };
  });
  return forward(operation);
});
