import React from "react";
import AppHeader from "../../shared/header/AppHeader";
import { Outlet } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

export const Dashboard = () => {
  const client = useApolloClient();
  console.log(client);
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
};
