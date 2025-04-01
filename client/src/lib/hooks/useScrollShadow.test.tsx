import { vi } from "vitest";
import { render, renderHook, screen } from "@testing-library/react";
import { bottomShadow, useScrollShadow } from "./useScrollShadow";
import Box from "@mui/material/Box";
import { forwardRef } from "react";

global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  callback,
}));

const DummyComponent = forwardRef((props, ref) => (
  <Box
    ref={ref}
    data-testid="dummy-div"
    style={{ height: 50, overflowY: "auto" }}
  />
));

const DummyComponentWithChildren = forwardRef((props, ref) => (
  <Box
    ref={ref}
    data-testid="dummy-div"
    style={{
      height: 50,
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    }}
  >
    {[...Array(25)].map((_, index) => (
      <div style={{ height: 25 }} key={index}>
        {index}
      </div>
    ))}
  </Box>
));

describe("useScrollShadow", () => {
  it("default state", () => {
    const { result } = renderHook(() => useScrollShadow());
    const { hasOverflow, ref } = result.current;

    expect(hasOverflow).toBe(false);
    expect(ref).toEqual({ current: null });
  });

  it("applied to an element", () => {
    const { result } = renderHook(() => useScrollShadow());
    const { ref } = result.current;

    render(<DummyComponent ref={ref} />);

    expect(screen.getByTestId("dummy-div")).toBeInTheDocument();
    expect(ref.current).not.toEqual({ current: null });
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveStyle({
      boxShadow: undefined,
    });
  });

  it.fails("box shadow applied correctly", async () => {
    const { result } = renderHook(() => useScrollShadow());
    const { ref } = result.current;

    render(<DummyComponentWithChildren ref={ref} />);

    const styledElement = screen.getByTestId("dummy-div");

    const computedStyles = window.getComputedStyle(styledElement);
    expect(computedStyles.boxShadow).toBe(bottomShadow);
  });

  // it("box shadow applied correctly when scrolled", () => {
  //   const { result } = renderHook(() => useScrollShadow());
  //   const { ref } = result.current;

  //   render(
  //     <Box
  //       ref={ref}
  //       data-testid="dummy-div"
  //       style={{ height: "100px", overflowY: "auto" }}
  //     />
  //   );

  //   if (ref.current) {
  //     ref.current.scrollTop = 10;
  //     ref.current.scrollHeight = 100;
  //     ref.current.clientHeight = 90;
  //     ref.current.onscroll(new Event("scroll"));
  //   }

  //   expect(ref.current.style.boxShadow).toBe(
  //     "inset 0 -8px 5px -5px rgb(200 200 200 / 1)"
  //   );
  // });
});
