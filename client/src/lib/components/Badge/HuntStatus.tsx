import { Badge } from "antd";
import React from "react";

export const HuntStatus = ({ isActive }: { isActive: boolean }) => {
  switch (isActive) {
    case true:
      return <Badge status="processing" text="Active" />;
    case false:
    default:
      return <Badge status="default" text="Not active" />;
  }
};
