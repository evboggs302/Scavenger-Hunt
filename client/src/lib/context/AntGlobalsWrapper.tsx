import App from "antd/es/app";
import React, { PropsWithChildren } from "react";

export const AntGlobalsWrapper = ({ children }: PropsWithChildren) => (
  <App
    notification={{ maxCount: 3, placement: "topRight" }}
    message={{ maxCount: 1 }}>
    {children}
  </App>
);
