import React from "react";
import { Layout } from "antd";
import { License } from "./License";

const { Footer } = Layout;

export const AppFooter = () => {
  return (
    <Footer>
      <License />
    </Footer>
  );
};
