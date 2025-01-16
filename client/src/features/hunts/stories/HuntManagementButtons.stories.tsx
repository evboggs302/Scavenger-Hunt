import type { Meta, StoryObj } from "@storybook/react";
import { HuntManagementButtons as Component } from "../components/HuntManagementButtons";

const meta: Meta<typeof Component> = {
  title: "Components/Hunts",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const HuntManagementButtons: Story = {};
