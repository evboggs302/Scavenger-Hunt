import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

type Props = {
  handleClose: () => void;
  message?: string;
};

export const SnackbarToast = ({
  handleClose,
  message = "Uh oh! An error ocurred. Please try again later.",
}: Props) => {
  return (
    <Snackbar
      key={Slide.name}
      open={true}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      onClose={handleClose}
      message={message}
      autoHideDuration={5000}
    />
  );
};
