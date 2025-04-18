import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const CircularLoading = () => {
  return (
    <Box
      data-testid="circular-loading"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
