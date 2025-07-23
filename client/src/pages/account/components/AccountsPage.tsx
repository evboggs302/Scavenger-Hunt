import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccountsPageContent } from "./AccountsPageContent";

export const AccountsPage = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
      <Typography variant="h3">Accounts Page</Typography>
      <AccountsPageContent />
    </Box>
  );
};
