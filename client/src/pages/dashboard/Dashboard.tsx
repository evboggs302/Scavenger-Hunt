import React from "react";
import { AppHeader } from "../../lib/components/Header/AppHeader";
import { Navigate } from "react-router-dom";
import { UserQryContextProvider } from "../../lib/context/userContext/context/UserQryContextProvider";
import { useTokenContext } from "../../lib/context/tokenContext/useTokenContext";
import { Layout } from "antd";
import { AppFooter } from "../../lib/components/Footer/AppFooter";
import { SidePanel } from "../../lib/components/SidePanel/SidePanel";
import { HuntQryContextProvider } from "../../lib/context/huntContext/HuntQryContextProvider";
import { DashBoardContent } from "./DashBoardContent";

export const Dashboard = () => {
  const { token } = useTokenContext();

  if (!token || token?.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <UserQryContextProvider>
      <HuntQryContextProvider>
        <Layout>
          <AppHeader />
          <Layout hasSider>
            <SidePanel />
            <DashBoardContent />
          </Layout>
          <AppFooter />
        </Layout>
      </HuntQryContextProvider>
    </UserQryContextProvider>
  );
};
