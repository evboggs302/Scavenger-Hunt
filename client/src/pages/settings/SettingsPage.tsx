import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ConfirmDeleteUserDialog } from "./ConfirmDeleteUserDialog";
import { useDeleteUserMutation } from "./hooks/useDeleteUserMutation";

export const SettingsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteUser, { loading }] = useDeleteUserMutation();

  const toggleDialog = () => setDialogOpen((val) => !val);
  const handleDelete = useCallback(async () => {
    toggleDialog();
    await deleteUser();
  }, [deleteUser]);

  return (
    <>
      <Box>
        <h1>Settings</h1>
        <p>Settings page content goes here.</p>
        <p>More settings can be added here.</p>
        <p>Enable AI offering here!</p>
        <Button variant="contained" color="primary">
          Save settings
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={toggleDialog}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Delete account
        </Button>
      </Box>
      {dialogOpen && (
        <ConfirmDeleteUserDialog
          closeDialog={toggleDialog}
          confirm={handleDelete}
        />
      )}
    </>
  );
};
