import type { Meta, StoryObj } from "@storybook/react";
import { TeamsPage as Component } from "./TeamsPage";

const meta: Meta<typeof Component> = {
  title: "Pages/Teams Page",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const TeamsPage: Story = {};
