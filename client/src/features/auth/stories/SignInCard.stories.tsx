import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { SignInCard } from "@features/auth/components/login/SignInCard";

const meta: Meta<typeof SignInCard> = {
  title: "Pages/Auth/Login",
  component: SignInCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SignInCard>;

export const SignIn: Story = {
  play: async (props) => {
    const { canvasElement, step } = props;
    const { getByTestId } = within(canvasElement);
    expect(getByTestId("login-title")).toBeInTheDocument();

    await step("Enter credentials", async () => {
      await userEvent.type(getByTestId("login-username"), "storybook");
      await userEvent.type(getByTestId("login-password"), "supersecret_pwd");
    });

    await step("Submit form", async () => {
      await userEvent.click(getByTestId("login-submit"));
    });
  },
};
