import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TeamCard as Component } from "../components/TeamCard";
import { generateTeams } from "@msw/utils/generateTeams";

const meta: Meta<typeof Component> = {
  title: "Components/Teams",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const TeamCard: Story = {
  render: () => {
    return <Component team={generateTeams()[0]} />;
  },
};
