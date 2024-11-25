import type { Meta, StoryObj } from "@storybook/react";
import { HomePage as Component } from "../components/HomePage";

const meta: Meta<typeof Component> = {
  title: "Pages/Home Page",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const HomePage: Story = {};
