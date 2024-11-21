import React from "react";
import { Link } from "react-router-dom";

export const License = () => {
  return (
    <>
      {"MIT License "}
      <a
        color="inherit"
        href="https://github.com/evboggs302/Scavenger-Hunt/blob/master/LICENSE"
        target="_blank">
        "Digital Scavenger" by Evan Boggs
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </>
  );
};
