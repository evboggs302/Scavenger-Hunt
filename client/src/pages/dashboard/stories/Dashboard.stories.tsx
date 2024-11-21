import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard as Component } from "../components/Dashboard";

const meta: Meta<typeof Component> = {
  title: "Pages/Dashboard",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const Dashboard: Story = {};
