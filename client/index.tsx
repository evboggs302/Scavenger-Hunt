import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import "./index.css";
import App from "./App";
import store from "./src/dux/store";

const client = new ApolloClient({
  uri: "http://localhost:22357/",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query getAllUsers {
        _id
        first_name
      }
    `,
  })
  .then((result) => console.log(result));

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
