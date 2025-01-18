import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { CreateCluesDialog as Component } from "../components/CreateCluesDialog/CreateCluesDialog";

const meta: Meta = {
  title: "Components/Clues",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const CreateCluesDialog: Story = {
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
