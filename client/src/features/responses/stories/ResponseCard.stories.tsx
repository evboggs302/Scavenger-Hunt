import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, graphql } from "msw";
import { ResponseCard as Component } from "../components/ResponseCard";
import { generateResponses } from "@msw/utils/generateResponses";
import { generateTeams } from "@msw/utils/generateTeams";
import { generateClues } from "@msw/utils/generateClues";
import { mswHandlers } from "@msw/mswHandlers";
import { GetHuntDocument } from "@generated/graphql";
import { generateHunts } from "@msw/utils/generateHunts";

const hunt = generateHunts()[0];
const clue = generateClues(1, hunt._id)[0];
const response = generateResponses(1, clue._id)[0];
const teams = generateTeams(1, hunt._id);

const meta: Meta<typeof Component> = {
  title: "Components/Responses",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const InactiveHunt_ResponseCard: Story = {
  render: () => {
    return (
      <Component
        response={{
          ...response,
          team_id: teams[0]._id,
        }}
      />
    );
  },
  parameters: {
    msw: {
      handlers: {
        ...mswHandlers,
        getHuntMock: graphql.query(GetHuntDocument, () => {
          return HttpResponse.json({
            data: {
              hunt: {
                ...hunt,
                is_active: false,
                teams,
              },
            },
          });
        }),
      },
    },
  },
};

export const ActiveHunt_ResponseCard: Story = {
  render: () => {
    return (
      <Component
        response={{
          ...response,
          team_id: teams[0]._id,
        }}
      />
    );
  },
  parameters: {
    msw: {
      handlers: {
        ...mswHandlers,
        getHuntMock: graphql.query(GetHuntDocument, () => {
          return HttpResponse.json({
            data: {
              hunt: {
                ...hunt,
                is_active: true,
                teams,
              },
            },
          });
        }),
      },
    },
  },
};
