import type { Meta, StoryObj } from "@storybook/react";
import { ClueCard as Component } from "../components/ClueCard";
import { mockHunt } from "@msw/utils/mockHunts";
import { mswHandlers } from "@msw/mswHandlers";
import { graphql, HttpResponse } from "msw";
import { GetHuntDocument } from "@generated/graphql";

const meta: Meta<typeof Component> = {
  title: "Components/Clues",
  component: Component,
  tags: ["autodocs"],
  render: () => {
    return (
      <>
        <Component canUpdateOrder clue={mockHunt.clues[0]} />
        <Component canUpdateOrder={false} clue={mockHunt.clues[0]} />
      </>
    );
  },
};
export default meta;

type Story = StoryObj<typeof Component>;

export const InactiveHunt_ClueCard: Story = {
  parameters: {
    msw: {
      handlers: {
        ...mswHandlers,
        getHuntMock: graphql.query(GetHuntDocument, () => {
          return HttpResponse.json({
            data: {
              hunt: {
                ...mockHunt,
                is_active: false,
              },
            },
          });
        }),
      },
    },
  },
};
export const ActiveHunt_ClueCard: Story = {
  parameters: {
    msw: {
      handlers: {
        ...mswHandlers,
        getHuntMock: graphql.query(GetHuntDocument, () => {
          return HttpResponse.json({
            data: {
              hunt: {
                ...mockHunt,
                is_active: true,
              },
            },
          });
        }),
      },
    },
  },
};
