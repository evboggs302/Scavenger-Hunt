import React from "react";
import { AppHeader } from "../../lib/components/Header/AppHeader";
import { Navigate, Outlet } from "react-router-dom";
import { UserQryContextProvider } from "../../lib/context/user/context/UserQryContextProvider";
import { useTokenContext } from "../../lib/context/tokenContext/useTokenContext";
import { Layout } from "antd";
import { AppFooter } from "../../lib/components/Footer/AppFooter";

const { Sider, Content } = Layout;

export const Dashboard = () => {
  const { token } = useTokenContext();

  if (!token || token?.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <UserQryContextProvider>
      <Layout>
        <AppHeader />
        <Content data-testid="dashboard-page">
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </UserQryContextProvider>
  );
};
