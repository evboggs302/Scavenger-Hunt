import Box from "@mui/material/Box";
import type { Meta, StoryObj } from "@storybook/react";
import { CreateCluesButton } from "../components/CreateCluesButton";
import { DeleteAllCluesButton } from "../components/DeleteAllCluesButton";

const Component = () => (
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <CreateCluesButton />
    <DeleteAllCluesButton />
  </Box>
);

const meta: Meta<typeof Component> = {
  title: "Components/Clues",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const ManageCluesButtons: Story = {};
