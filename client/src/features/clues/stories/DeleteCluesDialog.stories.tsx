import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { DeleteAllCluesDialog as Component } from "../components/DeleteCluesDialog/DeleteAllCluesDialog";

const meta: Meta = {
  title: "Components/Clues",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const DeleteAllCluesDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(!open);

    return (
      <>
        <Button variant="outlined" onClick={handleOpen}>
          Open Dialog
        </Button>
        {open && <Component handleClose={handleOpen} />}
      </>
    );
  },
};
