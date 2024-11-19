import Typography from "antd/es/typography";
import React from "react";

const { Text, Link } = Typography;

export const License = () => {
  return (
    <Text type="secondary">
      {"MIT License "}
      <Link
        color="inherit"
        href="https://github.com/evboggs302/Scavenger-Hunt/blob/master/LICENSE"
        target="_blank">
        "Digital Scavenger" by Evan Boggs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
};
