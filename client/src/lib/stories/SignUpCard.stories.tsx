import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { SignUpCard } from "@pages/auth/register/SignUpCard";

const meta: Meta<typeof SignUpCard> = {
  title: "Pages/Regsiter",
  component: SignUpCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SignUpCard>;

export const SignUp: Story = {
  play: async (props) => {
    const { args, canvasElement, step } = props;
    const { getByTestId } = within(canvasElement);
    expect(getByTestId("register-title")).toBeInTheDocument();

    await step("Enter credentials", async () => {
      await userEvent.type(getByTestId("register-username"), "storybook");
      await userEvent.type(getByTestId("register-firstname"), "story");
      await userEvent.type(getByTestId("register-lastname"), "book");
      await userEvent.type(getByTestId("register-password"), "supersecret_pwd");
    });

    await step("Submit form", async () => {
      await userEvent.click(getByTestId("register-submit"));
    });
  },
};
