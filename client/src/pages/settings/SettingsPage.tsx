import Box from "@mui/material/Box";
import { useDeleteUserMutation } from "./hooks/useDeleteUserMutation";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export const SettingsPage = () => {
  const [deleteUser, { loading }] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box>
      <h1>Settings</h1>
      <p>Settings page content goes here.</p>
      <p>More settings can be added here.</p>
      <p>Settings page content goes here.</p>
      <p>More settings can be added here.</p>
      <Button variant="contained" color="primary">
        Save Settings
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleDeleteUser}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        Delete Account
      </Button>
    </Box>
  );
};
