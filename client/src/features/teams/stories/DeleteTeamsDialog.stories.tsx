import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { DeleteAllTeamsDialog as Component } from "../components/DeleteTeamsDialog/DeleteAllTeamsDialog";

const meta: Meta = {
  title: "Components/Teams",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const DeleteAllTeamsDialog: Story = {
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
