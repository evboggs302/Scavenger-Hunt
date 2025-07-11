import { fireEvent, screen } from "@testing-library/react";
import { renderWrapper } from "@test/renderWrapper";
import { ErrorFallback } from "./ErrorFallback";

const navigate = vi.fn();

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("ErrorFallback", async () => {
  const { getByTestId } = screen;

  const mockErr = vi.fn((msg = "Test error") => new Error(msg));
  const mockResetErrorBoundary = vi.fn();

  let err: Error;

  beforeEach(() => {
    err = mockErr();
  });

  afterEach(() => {
    mockErr.mockClear();
    mockResetErrorBoundary.mockClear();
  });

  it("should render with default message", async () => {
    await renderWrapper(
      <ErrorFallback error={err} resetErrorBoundary={mockResetErrorBoundary} />
    );

    expect(getByTestId("fallback-image")).toBeInTheDocument();
    expect(getByTestId("fallback-message")).toHaveTextContent(
      "There was a problem. Please try again later."
    );
    expect(getByTestId("fallback-actions")).toBeInTheDocument();
  });

  it("should render with custom message", async () => {
    const customMessage = "Custom error message";
    await renderWrapper(
      <ErrorFallback
        error={err}
        message={customMessage}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );
    expect(getByTestId("fallback-message")).toHaveTextContent(customMessage);
  });

  it('should navigate to "/app" on button click', async () => {
    await renderWrapper(
      <ErrorFallback error={err} resetErrorBoundary={mockResetErrorBoundary} />
    );

    const button = getByTestId("fallback-navigate");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith("/app", {
      replace: true,
    });
  });

  it(`should click 'Try Again' button`, async () => {
    await renderWrapper(
      <ErrorFallback error={err} resetErrorBoundary={mockResetErrorBoundary} />
    );

    const button = getByTestId("fallback-try-again");
    fireEvent.click(button);

    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  it(`should be disabled: 'Try Again' button`, async () => {
    await renderWrapper(
      <ErrorFallback error={err} resetErrorBoundary={mockResetErrorBoundary} />
    );

    const button = getByTestId("fallback-try-again");
    fireEvent.click(button);

    expect(button).toBeDisabled();
  });
});
