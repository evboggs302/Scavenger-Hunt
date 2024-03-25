import type { Meta } from "@storybook/react";
import { Spinner as SpinnerComp } from "../components/Spinner/Spinner";

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
      options: ["sm", "md", "lg", "xl", 28],
      control: { type: "select" },
    },
  },
};
export default meta;

export const Spinner = {};
