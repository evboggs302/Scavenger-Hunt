import React from "react";
import { graphql } from "msw";
import {
  Spinner as SpinnerComp,
  SpinnerProps,
} from "../components/Spinner/Spinner";
import type { Meta, StoryFn } from "@storybook/react";
import { ArgTypes } from "@storybook/blocks";

const meta: Meta = {
  title: "Components/Spinner",
  component: SpinnerComp,
  tags: ["autodocs"],
  argTypes: {
    size: {
      defaultValue: {
        summary: "md",
      },
      description: "Accepts any number or a predefined string.",
      options: ["sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
  },
};
export default meta;

const Template: StoryFn<SpinnerProps> = (props) => <SpinnerComp {...props} />;

export const Spinner = Template.bind({});

<ArgTypes of={Spinner} />;
