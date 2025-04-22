import type { Meta, StoryObj } from "@storybook/react";
import { AuthSidePanel } from "@pages/auth/components/AuthSidePanel";

const meta: Meta<typeof AuthSidePanel> = {
  title: "Pages/Auth/Side Panel",
  component: AuthSidePanel,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof AuthSidePanel>;

export const SidePanel: Story = {};
