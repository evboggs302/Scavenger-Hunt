import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { DeleteHuntDialog as Component } from "../components/DeleteHuntDialog/DeleteHuntDialog";

const meta: Meta = {
  title: "Components/Delete Hunt Dailog",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const DeleteHuntDialog: Story = {
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
