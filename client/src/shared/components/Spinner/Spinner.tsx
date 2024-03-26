import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export type SpinnerProps = {
  size: "sm" | "md" | "lg" | "xl" | number;
};

export const Spinner: React.FC = ({ size }: Partial<SpinnerProps>) => {
  if (!size || typeof size === "string") {
    switch (size) {
      case "xl":
        return (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
        );
      case "lg":
        return (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
        );
      case "sm":
        return (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 10 }} spin />} />
        );
      case "md":
      default:
        return (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
        );
    }
  } else {
    if (size < 0) {
      return (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
      );
    }
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
    );
  }
};
