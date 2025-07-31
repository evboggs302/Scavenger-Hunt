import type { PropsWithChildren } from "react";
import Box from "@mui/material/Box";

export const ManagementButtonsContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: "8px",
      }}
    >
      {children}
    </Box>
  );
};
