import React from "react";
import { AppHeader } from "../../shared/components/Header/AppHeader";
import { Navigate, Outlet } from "react-router-dom";
import { UserQryContextProvider } from "../../shared/context/user/context/UserQryContextProvider";
import { useTokenContext } from "../../shared/context/tokenContext/useTokenContext";
import { Layout } from "antd";
import { AppFooter } from "../../shared/components/Footer/AppFooter";

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
