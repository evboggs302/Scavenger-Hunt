import type { Meta, StoryObj } from "@storybook/react";
import { TeamsTable as Component } from "../components/TeamsTable/TeamsTable";

const meta: Meta<typeof Component> = {
  title: "Components/Teams",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const TeamCardList: Story = {};
