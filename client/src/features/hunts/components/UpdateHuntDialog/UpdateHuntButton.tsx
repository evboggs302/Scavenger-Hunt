import React, { useCallback, useState } from "react";
import { UpdateHuntDialog } from "./UpdateHuntDialog";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type UpdateHuntButtonProps = {
  variant?: "small" | "normal";
};

export const UpdateHuntButton = ({
  variant = "normal",
}: UpdateHuntButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      {variant === "normal" && (
        <Button variant="outlined" onClick={handleClickOpen}>
          New hunt
        </Button>
      )}
      {variant === "small" && (
        <IconButton onClick={handleClickOpen}>
          <EditOutlinedIcon />
        </IconButton>
      )}
      {isOpen && <UpdateHuntDialog handleClose={handleClose} />}
    </>
  );
};
