import { PropsWithChildren } from "react";
import Box, { BoxProps } from "@mui/material/Box";

export const FieldWrapper = ({ children, sx }: PropsWithChildren<BoxProps>) => {
  return <Box sx={{ margin: "14px auto", ...sx }}>{children}</Box>;
};
