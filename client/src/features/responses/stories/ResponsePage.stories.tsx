import type { Meta, StoryObj } from "@storybook/react";
import { ResponsesPage as Component } from "../components/ResponsesPage";
import { mswHandlers } from "@msw/mswHandlers";
import { HttpResponse, graphql } from "msw";
import { GetHuntDocument } from "@generated/graphql";
import { generateHunts } from "@msw/utils/generateHunts";

const hunt = generateHunts()[0];

const meta: Meta<typeof Component> = {
  title: "Pages/Response Page",
  component: Component,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Component>;

export const InactiveHuntResponsesPage: Story = {
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
              },
            },
          });
        }),
      },
    },
  },
};
