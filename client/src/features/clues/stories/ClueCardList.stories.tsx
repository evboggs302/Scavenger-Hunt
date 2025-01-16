import type { Meta, StoryObj } from "@storybook/react";
import { ClueCardList as Component } from "../components/ClueCardList";

const meta: Meta<typeof Component> = {
  title: "Components/Clues",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const ClueCardList: Story = {};
