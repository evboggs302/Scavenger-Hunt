import type { Meta, StoryObj } from "@storybook/react";
import { ManageCluesMenu as Component } from "../components/ManageCluesMenu";

const meta: Meta<typeof Component> = {
  title: "Components/Clues",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const ManageCluesMenu: Story = {};
