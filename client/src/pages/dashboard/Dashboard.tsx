import React from "react";
import AppHeader from "../../shared/components/header/AppHeader";
import { Navigate, Outlet } from "react-router-dom";
import { UserQryContextProvider } from "../../shared/context/user/context/UserQryContextProvider";
import { useTokenContext } from "../../shared/context/tokenContext/useTokenContext";
import { Layout } from "antd";
import { AppFooter } from "../../shared/components/footer/AppFooter";

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
        <Content className="signin">
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </UserQryContextProvider>
  );
};
