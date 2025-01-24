import { ComponentPropsWithRef, PropsWithChildren } from "react";
import Box from "@mui/material/Box";

type CardListContainerProps = PropsWithChildren & ComponentPropsWithRef<"div">;

export const CardListContainer = ({ children }: CardListContainerProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {children}
    </Box>
  );
};
