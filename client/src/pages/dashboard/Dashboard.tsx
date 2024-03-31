import React from "react";
import { AppHeader } from "../../lib/components/Header/AppHeader";
import { Navigate, Outlet } from "react-router-dom";
import { UserQryContextProvider } from "../../lib/context/userContext/context/UserQryContextProvider";
import { useTokenContext } from "../../lib/context/tokenContext/useTokenContext";
import { Layout } from "antd";
import { AppFooter } from "../../lib/components/Footer/AppFooter";
import { SidePanel } from "../../lib/components/SidePanel/SidePanel";
import { HuntQryContextProvider } from "../../lib/context/huntContext/HuntQryContextProvider";

const { Content } = Layout;

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
            <Content
              data-testid="dashboard-page"
              style={{
                margin: 12,
                overflow: "initial",
                maxHeight: "calc(100vh - 158px)",
              }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: "white",
                  borderRadius: 8,
                }}>
                <Outlet />
              </div>
            </Content>
          </Layout>
          <AppFooter />
        </Layout>
      </HuntQryContextProvider>
    </UserQryContextProvider>
  );
};
