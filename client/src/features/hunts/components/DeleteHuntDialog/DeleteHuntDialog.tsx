import React, { useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { useDeleteHuntMutation } from "../../hooks/useDeleteHuntMutation";

type DeleteDialogProps = {
  handleClose: () => void;
};

export const DeleteHuntDialog = ({ handleClose }: DeleteDialogProps) => {
  const [deleteHunt, { loading: deleteLoading, error: deleteError }] =
    useDeleteHuntMutation();

  const handleDeleteAll = useCallback(async () => {
    try {
      await deleteHunt();
      handleClose();
    } catch {
      throw Error(deleteError?.message);
    }
  }, [deleteError?.message, deleteHunt, handleClose]);

  return (
    <Dialog
      open={true}
      PaperProps={{
        component: "form",
        onSubmit: handleDeleteAll,
      }}
    >
      <DialogTitle data-testid="delete-hunt-title">Delete hunt</DialogTitle>
      <DialogContent>
        {deleteError && <TryAgainAlert message={deleteError.message} />}
        <DialogContentText>
          Are you sure you want to delete this hunt?
          <br />
          <i>This cannot be undone.</i>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          color="error"
          disabled={deleteLoading}
          endIcon={deleteLoading && <CircularProgress size={20} />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
