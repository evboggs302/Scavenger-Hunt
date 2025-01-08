import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type DeleteDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const DeleteCluesDialog = ({
  isOpen,
  handleClose,
}: DeleteDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        // onSubmit: () => {}
      }}
    >
      <DialogTitle data-testid="create-hunt-title">Delete clues</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete ALL clues?
          <br />
          <i>This cannot be undone.</i>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
