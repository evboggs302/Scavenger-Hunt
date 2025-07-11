import { act, fireEvent, render, screen } from "@testing-library/react";
import { CreateCardsIconButton } from "./CreateCardsIconButton";

describe("CreateCardsIconButton", () => {
  const { findByText, getByRole } = screen;

  const mockOnClick = vi.fn();

  afterEach(() => {
    mockOnClick.mockReset();
  });

  it("should render", () => {
    render(<CreateCardsIconButton onClick={mockOnClick} />);

    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "create-cards-icon-button");
  });

  it("should render without data", () => {
    render(<CreateCardsIconButton onClick={mockOnClick} />);

    const button = getByRole("button");

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should display custom tooltip", async () => {
    const text = "custom tooltip text";
    render(<CreateCardsIconButton onClick={mockOnClick} tooltipText={text} />);

    const button = getByRole("button");

    act(() => {
      fireEvent.mouseOver(button, { bubbles: true });
    });

    const tooltipContent = await findByText(text);

    expect(tooltipContent).toBeInTheDocument();
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
