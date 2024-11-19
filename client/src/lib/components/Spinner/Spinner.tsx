import React, { CSSProperties } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Spin from "antd/es/spin";

export type SpinnerProps = {
  size: "sm" | "md" | "lg" | "xl" | number;
  style: CSSProperties;
};

export const Spinner = ({ size, style }: Partial<SpinnerProps>) => {
  if (!size || typeof size === "string") {
    switch (size) {
      case "xl":
        return (
          <Spin
            style={{ ...style }}
            indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
          />
        );
      case "lg":
        return (
          <Spin
            style={{ ...style }}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          />
        );
      case "sm":
        return (
          <Spin
            style={{ ...style }}
            indicator={<LoadingOutlined style={{ fontSize: 10 }} spin />}
          />
        );
      case "md":
      default:
        return (
          <Spin
            style={{ ...style }}
            indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}
          />
        );
    }
  } else {
    if (size < 0) {
      return (
        <Spin
          style={{ ...style }}
          indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}
        />
      );
    }
    return (
      <Spin
        style={{ ...style }}
        indicator={<LoadingOutlined style={{ fontSize: size }} spin />}
      />
    );
  }
};
