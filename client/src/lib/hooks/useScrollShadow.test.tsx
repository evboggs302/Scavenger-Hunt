import { forwardRef } from "react";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import Box from "@mui/material/Box";
import { useScrollShadow } from "./useScrollShadow";

const DummyComponent = forwardRef<HTMLElement>((_, ref) => (
  <Box
    ref={ref}
    data-testid="dummy-div"
    style={{
      height: "50px",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    }}
  >
    <div style={{ height: 25 }}>BLAH</div>
  </Box>
));

describe("useScrollShadow", () => {
  const disconnectSpy = vi.fn();

  beforeEach(() => {
    vi.stubGlobal(
      "ResizeObserver",
      class MockedResizeObserver {
        constructor(cb: ResizeObserverCallback) {
          setTimeout(() => {
            cb([], this);
          }, 100);
        }

        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = disconnectSpy;
      }
    );
  });

  afterEach(() => {
    disconnectSpy.mockClear();
    vi.unstubAllGlobals();
  });

  it("hook default state", async () => {
    const { result } = renderHook(() => useScrollShadow());
    const { hasOverflow, ref } = result.current;

    expect(hasOverflow).toBe(false);
    expect(ref).toEqual({ current: null });
  });

  it("REF applied to an element", async () => {
    const { result } = renderHook(() => useScrollShadow());
    const { ref } = result.current;

    await waitFor(() => render(<DummyComponent ref={ref} />));
    const scrollableDiv = screen.getByTestId("dummy-div");

    expect(scrollableDiv).toBeInTheDocument();
    expect(ref.current).not.toEqual(null);
    expect(ref.current).toHaveAttribute("data-testid", "dummy-div");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("ResizeObserver disconnects", async () => {
    const { result } = renderHook(() => useScrollShadow());
    const { ref } = result.current;

    const { unmount } = await waitFor(() =>
      render(<DummyComponent ref={ref} />)
    );

    unmount();

    expect(disconnectSpy).toBeCalled();
  });
});
