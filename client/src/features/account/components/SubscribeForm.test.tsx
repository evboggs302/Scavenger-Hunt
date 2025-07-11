import { fireEvent, screen } from "@testing-library/react";
import { renderWrapper } from "@test/renderWrapper";
import { SubscribeForm } from "./SubscribeForm";

describe("SubscribeForm", () => {
  const { getByRole, getByTestId } = screen;

  it("renders the button to create a new subscription", async () => {
    await renderWrapper(<SubscribeForm />);

    expect(
      getByRole("button", { name: "Create NEW subscription" })
    ).toBeInTheDocument();
  });

  it("button click opens dialog", async () => {
    await renderWrapper(<SubscribeForm />);

    const button = getByRole("button", {
      name: "Create NEW subscription",
    });

    fireEvent.click(button);
    expect(getByTestId("create-subscription")).toBeInTheDocument();
  });
});
