import React from "react";
import AppHeader from "../../shared/header/AppHeader";
import { Navigate, Outlet } from "react-router-dom";
import { UserQryContextProvider } from "../../shared/user/context/UserQryContextProvider";
import { useTokenContext } from "../../shared/tokenManagement/useTokenRefContext";

export const Dashboard = () => {
  const { token } = useTokenContext();
  // console.log(token);
  if (!token || token?.length === 0) {
    return <Navigate to="/" replace />;
  }
  return (
    <UserQryContextProvider>
      <AppHeader />
      <Outlet />
    </UserQryContextProvider>
  );
};
