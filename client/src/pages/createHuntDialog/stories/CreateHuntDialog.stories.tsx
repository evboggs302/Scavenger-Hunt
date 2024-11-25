import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { userEvent, within, expect } from "@storybook/test";
import Button from "@mui/material/Button";
import { CreateHuntDialog as Component } from "../components/CreateHuntDialog";
import dayjs from "dayjs";

const meta: Meta = {
  title: "Components/Create Hunt Dailog",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const CreateHuntDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(!open);

    return (
      <>
        <Button variant="outlined" onClick={handleOpen}>
          Open Dialog
        </Button>
        <Component isOpen={open} handleClose={handleOpen} />
      </>
    );
  },
};
