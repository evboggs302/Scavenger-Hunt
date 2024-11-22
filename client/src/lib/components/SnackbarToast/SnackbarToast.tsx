import React, { useCallback, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

type Props = {
  message?: string;
};

export const SnackbarToast = ({
  message = "Uh oh! An error ocurred. Please try again later.",
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <Snackbar
      key={Slide.name}
      open={isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      onClose={handleClose}
      message={message}
      autoHideDuration={5000}
    />
  );
};
