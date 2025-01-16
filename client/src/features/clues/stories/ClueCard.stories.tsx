import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ClueCard as Component } from "../components/ClueCard";
import { faker } from "@faker-js/faker";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

const meta: Meta<typeof Component> = {
  title: "Components/Clues",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const ClueCard: Story = {
  render: () => {
    return (
      <Component
        clue={{
          __typename: "CluePayload",
          _id: hexadecimalStr(),
          hunt_id: hexadecimalStr(),
          order_number: 1,
          description: faker.lorem.sentence(),
        }}
      />
    );
  },
};
