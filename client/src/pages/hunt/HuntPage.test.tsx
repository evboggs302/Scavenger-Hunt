import { renderWrapper } from "@test/renderWrapper";
import { fireEvent, screen } from "@testing-library/dom";
import { HuntPage } from "./HuntPage";

const navigate = vi.fn();
vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("HuntPage", () => {
  const { getByRole } = screen;

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders correctly", async () => {
    await renderWrapper(<HuntPage />);

    const tabs = getByRole("tablist", { name: "hunt tabs" });
    expect(tabs).toBeInTheDocument();
  });

  it("default tab (info)", async () => {
    await renderWrapper(<HuntPage />);

    const tab = getByRole("tab", { name: "Info" });
    expect(tab.getAttribute("aria-selected")).toBe("true");
  });

  it("clues tab selected", async () => {
    await renderWrapper(<HuntPage />, {
      params: {
        clues: "",
      },
    });

    const tab = getByRole("tab", { name: "Clues" });
    expect(tab.getAttribute("aria-selected")).toBe("true");
  });

  it("teams tab", async () => {
    await renderWrapper(<HuntPage />, {
      params: {
        teams: "",
      },
    });

    const tab = getByRole("tab", { name: "Teams" });
    expect(tab.getAttribute("aria-selected")).toBe("true");
  });

  it("responses tab", async () => {
    await renderWrapper(<HuntPage />, {
      params: {
        responses: "",
      },
    });

    const tab = getByRole("tab", { name: "Responses" });
    expect(tab.getAttribute("aria-selected")).toBe("true");
  });

  it("results tab", async () => {
    await renderWrapper(<HuntPage />, {
      params: {
        results: "",
      },
    });

    const tab = getByRole("tab", { name: "Results" });
    expect(tab.getAttribute("aria-selected")).toBe("true");
  });

  describe("Navigation clicks fire", () => {
    it("Info tab clicked", async () => {
      await renderWrapper(<HuntPage />, {
        params: {
          clues: "",
        },
      });

      const tab = getByRole("tab", { name: "Info" });
      fireEvent.click(tab);
      expect(navigate).toHaveBeenCalledWith("", { relative: "path" });
    });

    it("Clues tab clicked", async () => {
      await renderWrapper(<HuntPage />);

      const tab = getByRole("tab", { name: "Clues" });
      fireEvent.click(tab);
      expect(navigate).toHaveBeenCalledWith("clues", { relative: "path" });
    });

    it("Teams tab clicked", async () => {
      await renderWrapper(<HuntPage />);

      const tab = getByRole("tab", { name: "Teams" });
      fireEvent.click(tab);
      expect(navigate).toHaveBeenCalledWith("teams", { relative: "path" });
    });

    it("Responses tab clicked", async () => {
      await renderWrapper(<HuntPage />);

      const tab = getByRole("tab", { name: "Responses" });
      fireEvent.click(tab);
      expect(navigate).toHaveBeenCalledWith("responses", { relative: "path" });
    });

    it("Results tab clicked", async () => {
      await renderWrapper(<HuntPage />);

      const tab = getByRole("tab", { name: "Results" });
      fireEvent.click(tab);
      expect(navigate).toHaveBeenCalledWith("results", { relative: "path" });
    });
  });
});
