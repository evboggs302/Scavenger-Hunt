import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { SignUpCard } from "../SignUpCard";

const meta: Meta<typeof SignUpCard> = {
  title: "Pages/Auth/Regsiter",
  component: SignUpCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SignUpCard>;

export const SignUp: Story = {
  render: () => {
    return (
      <>
        A username of "story" already exists.
        <SignUpCard />
      </>
    );
  },
  play: async (props) => {
    const { canvasElement, step } = props;
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
