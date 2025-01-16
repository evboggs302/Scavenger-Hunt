import type { Meta, StoryObj } from "@storybook/react";
import { CluesPage as Component } from "../components/CluesPage";

const meta: Meta<typeof Component> = {
  title: "Pages/Clues Page",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const CluesPage: Story = {};
