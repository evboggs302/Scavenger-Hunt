import React, { PropsWithChildren } from "react";
import Box from "@mui/material/Box";

export const FieldWrapper = ({ children }: PropsWithChildren) => {
  return <Box sx={{ margin: "14px auto" }}>{children}</Box>;
};
