import { useCallback, useState } from "react";
import { UpdateHuntDialog } from "./UpdateHuntDialog";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";

export const UpdateHuntButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<EditOutlinedIcon />}
      >
        Edit details
      </Button>
      {isOpen && <UpdateHuntDialog handleClose={handleClose} />}
    </>
  );
};
