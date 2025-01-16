import type { Meta, StoryObj } from "@storybook/react";
import { TeamCardList as Component } from "../components/TeamCardList";

const meta: Meta<typeof Component> = {
  title: "Components/Teams",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const TeamCardList: Story = {};
