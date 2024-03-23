import React, { PropsWithChildren } from "react";
import { App } from "antd";

export const AntGlobalsWrapper = ({ children }: PropsWithChildren) => (
  <App
    notification={{ maxCount: 3, placement: "topRight" }}
    message={{ maxCount: 1 }}>
    {children}
  </App>
);
