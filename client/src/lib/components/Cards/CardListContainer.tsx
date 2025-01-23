import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
// import { useDrop } from "react-dnd";

type CardListContainerProps = PropsWithChildren & {};

export const CardListContainer = ({ children }: CardListContainerProps) => {
  // const [, drop] = useDrop(() => ({ accept: "card" }));

  return (
    <Box
      // ref={drop}
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
