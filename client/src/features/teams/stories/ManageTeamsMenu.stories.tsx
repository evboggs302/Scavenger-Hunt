import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";
import { CreateTeamsButton } from "../components/CreateTeamsButton";
import { DeleteAllTeamsButton } from "../components/DeleteAllTeamsButton";

const Component = () => (
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <CreateTeamsButton />
    <DeleteAllTeamsButton />
  </Box>
);

const meta: Meta<typeof Component> = {
  title: "Components/Teams",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const ManageTeamsButtons: Story = {};
