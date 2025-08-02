import type { Meta, StoryObj } from "@storybook/react";
import { HuntDetails as Component } from "../HuntDetails";

const meta: Meta<typeof Component> = {
  title: "Pages/Hunt Details",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const HuntDetails: Story = {};
