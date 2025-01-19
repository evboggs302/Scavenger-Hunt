import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type NoCardsToShowTextProps = { type: "clues" | "teams" | "responses" };

export const NoCardsToShowText = ({ type }: NoCardsToShowTextProps) => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Typography variant="h3">{`No ${type} to show... yet!`}</Typography>
    </Box>
  );
};
