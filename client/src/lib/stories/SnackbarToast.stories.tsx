import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarToast as Component } from "@lib/components/SnackbarToast/SnackbarToast";
import Button from "@mui/material/Button";

const meta: Meta<typeof Component> = {
  title: "LIB/Snackbar Toast",
  component: Component,
  tags: ["autodocs"],
  render: () => {
    const [open, setOpen] = useState(true);

    const handleClose = () => setOpen(!open);

    return (
      <>
        <Button variant="outlined" onClick={handleClose}>
          Open Dialog
        </Button>
        {open && <Component handleClose={handleClose} />}
      </>
    );
  },
};
export default meta;

type Story = StoryObj<typeof Component>;

export const SnackbarToast: Story = {};
