import React from "react";
import { Typography } from "antd";

const { Text, Link } = Typography;

export const Copyright = () => {
  return (
    <Text type="secondary">
      {"Copyright © "}
      <Link color="inherit" href="">
        "Digital Scavenger" by Evan Boggs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
};
