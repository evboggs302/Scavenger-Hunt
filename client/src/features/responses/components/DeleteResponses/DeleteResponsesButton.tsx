import { useCallback, useState } from "react";
import { DeleteResponsesDialog } from "./DeleteResponsesDialog";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";
import { ManagementButtonsContainer } from "@lib/components/ManagementButtons/ManagementButtonsContainer";

export const DeleteResponsesButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <ManagementButtonsContainer>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="error"
        startIcon={<EditOutlinedIcon />}
      >
        Delete Responses
      </Button>
      {isOpen && <DeleteResponsesDialog handleClose={handleClose} />}
    </ManagementButtonsContainer>
  );
};
