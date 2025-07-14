import { fireEvent, screen } from "@testing-library/react";
import { renderWrapper } from "@test/renderWrapper";
import { SubscriptionInfo } from "./SubscriptionInfo";
import { testServer } from "@test/testServer";
import { fetchAccountTransationsHandler_INACTIVE } from "@msw/handlers/accounts/fetchAccountTransationsHandler_INACTIVE";

const mockedCancel = vi.fn();
vi.mock("../hooks/useCancelSubscription", () => {
  return {
    useCancelSubscription: () => [mockedCancel, { loading: false }],
  };
});

describe("SubscriptionInfo", async () => {
  const { getByRole, getByText } = screen;

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("renders correctly", async () => {
    await renderWrapper(<SubscriptionInfo />);

    expect(getByRole("heading", { name: "Subscription" })).toBeDefined();
  });

  it("subscription status: INACTIVE", async () => {
    testServer.use(fetchAccountTransationsHandler_INACTIVE);
    await renderWrapper(<SubscriptionInfo />);

    expect(getByText("Inactive subscription")).toBeInTheDocument();
  });

  it("subscription status: ACTIVE", async () => {
    await renderWrapper(<SubscriptionInfo />);

    expect(getByText("Active subscription")).toBeInTheDocument();
  });

  it("subscription cancel button clicked", async () => {
    await renderWrapper(<SubscriptionInfo />);

    const button = getByRole("button", { name: "Cancel subscription" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockedCancel).toHaveBeenCalled();
  });
});
