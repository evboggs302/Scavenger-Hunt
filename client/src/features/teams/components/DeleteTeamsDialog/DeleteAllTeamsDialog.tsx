import React, { useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { useDeleteAllTeamsMutation } from "../../hooks/useDeleteAllTeamsMutation";

type DeleteDialogProps = {
  handleClose: () => void;
};

export const DeleteAllTeamsDialog = ({ handleClose }: DeleteDialogProps) => {
  const [deleteAll, { error, loading }] = useDeleteAllTeamsMutation();

  const handleDeleteAll = useCallback(async () => {
    try {
      await deleteAll();
      handleClose();
    } catch {
      throw Error(error?.message);
    }
  }, [deleteAll, error?.message, handleClose]);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleDeleteAll,
      }}
    >
      <DialogTitle data-testid="create-hunt-title">Delete teams</DialogTitle>
      <DialogContent>
        {error && <TryAgainAlert message={error.message} />}
        <DialogContentText>
          Are you sure you want to delete ALL teams?
          <br />
          <i>This cannot be undone.</i>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          color="error"
          disabled={loading}
          endIcon={loading && <CircularProgress size={20} />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
