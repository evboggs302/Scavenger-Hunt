import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, graphql } from "msw";
import { mswHandlers } from "@msw/mswHandlers";
import { GetHuntDocument } from "@generated/graphql";
import { TeamCard as Component } from "../components/TeamCard";
import { mockHunt } from "@msw/utils/mockHunts";

const meta: Meta<typeof Component> = {
  title: "Components/Teams",
  component: Component,
  tags: ["autodocs"],
  render: () => {
    return <Component team={mockHunt.teams[0]} />;
  },
};
export default meta;

type Story = StoryObj<typeof Component>;

export const InactiveHunt_TeamCard: Story = {
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

export const ActiveHunt_TeamCard: Story = {
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
