import type { Meta, StoryObj } from "@storybook/react";
import { ManageTeamsMenu as Component } from "../components/ManageTeamsMenu";

const meta: Meta<typeof Component> = {
  title: "Components/Teams",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const ManageTeamsMenu: Story = {};
