import React from "react";
import { Layout } from "antd";
import { Copyright } from "../Copyright";

const { Footer } = Layout;

export const AppFooter = () => {
  return (
    <Footer>
      <Copyright />
    </Footer>
  );
};
