import type { Meta, StoryObj } from "@storybook/react";
import { BaseApp as Component } from "../components/BaseApp";

const meta: Meta<typeof Component> = {
  title: "Pages/BaseApp",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const BaseApp: Story = {};
