import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const DashBoardContent = () => {
  return (
    <Content
      data-testid="dashboard-page"
      style={{
        margin: 12,
        padding: 24,
        minHeight: 360,
        background: "white",
        overflowY: "auto",
        height: "calc(100vh - 158px)",
        borderRadius: 8,
      }}>
      <Outlet />
    </Content>
  );
};
