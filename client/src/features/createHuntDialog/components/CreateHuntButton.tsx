import React, { useCallback, useState } from "react";
import { CreateHuntDialog } from "./CreateHuntDialog";
import Button from "@mui/material/Button";

export const CreateHuntButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        New hunt
      </Button>
      <CreateHuntDialog isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};
