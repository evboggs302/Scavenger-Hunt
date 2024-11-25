import React from "react";
import Alert from "@mui/material/Alert";

type Props = {
  message?: string;
};

export const TryAgainAlert = ({ message }: Props) => {
  const allertMessage = message
    ? `${message} Please try again later.`
    : "Please try again later.";

  return <Alert severity="error">{allertMessage}</Alert>;
};
