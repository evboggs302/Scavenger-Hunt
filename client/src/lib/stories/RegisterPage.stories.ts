import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within, expect } from "@storybook/test";
import { RegisterPage } from "../../pages/auth/register/RegisterPage";

const meta: Meta<typeof RegisterPage> = {
  title: "Pages/Regsiter",
  component: RegisterPage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof RegisterPage>;

export const Register: Story = {
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
