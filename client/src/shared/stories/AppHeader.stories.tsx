import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { AppHeader } from "../components/Header/AppHeader";

const meta: Meta = {
  title: "Components/Header",
  component: AppHeader,
  tags: ["autodocs"],
};
export default meta;

const Template: StoryFn = (props) => <AppHeader />;

export const Header = Template.bind({});
