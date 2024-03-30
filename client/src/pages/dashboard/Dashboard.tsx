import React from "react";
import { AppHeader } from "../../lib/components/Header/AppHeader";
import { Navigate, Outlet } from "react-router-dom";
import { UserQryContextProvider } from "../../lib/context/user/context/UserQryContextProvider";
import { useTokenContext } from "../../lib/context/tokenContext/useTokenContext";
import { Layout } from "antd";
import { AppFooter } from "../../lib/components/Footer/AppFooter";
import { SidePanel } from "../../lib/components/SidePanel/SidePanel";

const { Content } = Layout;

export const Dashboard = () => {
  const { token } = useTokenContext();

  if (!token || token?.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <UserQryContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <SidePanel />
          <Content data-testid="dashboard-page">
            <Outlet />
          </Content>
        </Layout>
        <AppFooter />
      </Layout>
    </UserQryContextProvider>
  );
};
