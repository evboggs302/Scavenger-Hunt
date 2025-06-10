import { useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { useDeleteResponsesByHuntMutation } from "@features/responses/hooks/useDeleteResponsesByHuntMutation";

type DeleteDialogProps = {
  handleClose: () => void;
};

export const DeleteResponsesDialog = ({ handleClose }: DeleteDialogProps) => {
  const [deleteResponses, { loading: deleteLoading, error: deleteError }] =
    useDeleteResponsesByHuntMutation();

  const handleDeleteAll = useCallback(async () => {
    try {
      await deleteResponses();
    } finally {
      handleClose();
    }
  }, [deleteResponses, handleClose]);

  return (
    <Dialog
      open={true}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleDeleteAll,
        },
      }}
    >
      <DialogTitle data-testid="delete-responses-title">
        Delete hunt
      </DialogTitle>
      <DialogContent>
        {deleteError && <TryAgainAlert message={deleteError.message} />}
        <DialogContentText>
          Are you sure you want to delete ALL responses?
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
