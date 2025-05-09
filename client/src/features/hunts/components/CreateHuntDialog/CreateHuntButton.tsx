import { useCallback, useState } from "react";
import { CreateHuntDialog } from "./CreateHuntDialog";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";

type CreateHuntButtonProps = {
  variant?: "small" | "normal";
};

export const CreateHuntButton = ({
  variant = "normal",
}: CreateHuntButtonProps) => {
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          New hunt
        </Button>
      )}
      {variant === "small" && (
        <IconButton onClick={handleClickOpen}>
          <AddBoxIcon />
        </IconButton>
      )}
      {isOpen && <CreateHuntDialog handleClose={handleClose} />}
    </>
  );
};
