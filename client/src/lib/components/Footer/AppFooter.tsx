import React from "react";
import { License } from "./License";
import Layout from "antd/es/layout";

const { Footer } = Layout;

export const AppFooter = () => {
  return (
    <Footer>
      <License />
    </Footer>
  );
};
