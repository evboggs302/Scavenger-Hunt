import React from "react";
import { Outlet } from "react-router-dom";

export const DashBoardContent = () => {
  return (
    // <Content
    //   data-testid="dashboard-page"
    //   style={{
    //     margin: 12,
    //     padding: 24,
    //     minHeight: 360,
    //     background: "white",
    //     overflowY: "auto",
    //     height: "calc(100vh - 158px)",
    //     borderRadius: 8,
    //   }}>
      <Outlet />
    // </Content>
  );
};
