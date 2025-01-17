import type { Meta, StoryObj } from "@storybook/react";
import { ErrorFallback as Component } from "@lib/components/ErrorFallback/ErrorFallback";

const meta: Meta<typeof Component> = {
  title: "LIB/Error Boundary Fallback",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const ErrorFallback: Story = {};
