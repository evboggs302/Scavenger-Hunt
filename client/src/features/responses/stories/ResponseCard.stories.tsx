import type { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, graphql } from "msw";
import { ResponseCard as Component } from "../components/ResponseCard";
import { mswHandlers } from "@msw/mswHandlers";
import { GetHuntDocument } from "@generated/graphql";
import { mockHunt } from "@msw/utils/mockHunts";

const responses = mockHunt.clues
  .flatMap((clu) => clu.responses)
  .filter((res) => !!res);

const meta: Meta<typeof Component> = {
  title: "Components/Responses",
  component: Component,
  tags: ["autodocs"],
  render: () => {
    const correctResponse = responses.filter((res) => res.correct === true)[0];
    const incorrectResponse = responses.filter(
      (res) => res.correct === false
    )[0];

    return (
      <>
        <Component response={correctResponse} />;
        <Component response={incorrectResponse} />;
      </>
    );
  },
};
export default meta;

type Story = StoryObj<typeof Component>;

export const InactiveHunt_ResponseCard: Story = {
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

export const ActiveHunt_ResponseCard: Story = {
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
