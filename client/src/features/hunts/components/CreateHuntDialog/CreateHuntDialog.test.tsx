import { renderWrapper } from "@test/renderWrapper";
import { act } from "@testing-library/react";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { CreateHuntDialog } from "./CreateHuntDialog";
import { useCreateHuntMutation } from "../../hooks/useCreateHuntMutation";
import dayjs, { Dayjs } from "dayjs";
import type { ApolloClient } from "@apollo/client";
import type { CreateHuntFormSchema } from "./useCreateHuntResolver";

const mockedCreate = vi.fn<(args: CreateHuntFormSchema) => Promise<void>>();
vi.mock("../../hooks/useCreateHuntMutation");

const mockedCreateResponse = {
  loading: false,
  error: undefined,
  called: false,
  client: {} as ApolloClient<object>,
  reset: function (): void {
    throw new Error("Function not implemented.");
  },
};

describe("CreateHuntDialog", () => {
  const { getByRole, getByTestId, getByText } = screen;

  const handleCloseMock = vi.fn();
  const huntName: string = "Test hunt name";
  const recallMsg: string = "Hunt recall message";

  const startDate: Dayjs = dayjs().add(1, "day");
  const startDateFormatted: string = startDate.format("MM/DD/YYYY");
  const endDate: Dayjs = dayjs().add(2, "day");
  const endDateFormatted: string = endDate.format("MM/DD/YYYY");

  beforeEach(async () => {
    vi.mocked(useCreateHuntMutation).mockReturnValue([
      mockedCreate,
      mockedCreateResponse,
    ]);

    await renderWrapper(<CreateHuntDialog handleClose={handleCloseMock} />);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders correctly", async () => {
    expect(getByTestId("create-hunt-title")).toBeInTheDocument();
  });

  it("cancels create", async () => {
    const cancelBtn = getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    expect(handleCloseMock).toBeCalledTimes(1);
  });

  it("confirms create button is disabled before filling form", async () => {
    const createBtn = getByRole("button", { name: "Create Hunt" });
    expect(createBtn).toBeDisabled();
  });

  describe("Name field", () => {
    it("DEFAULT", async () => {
      const input = getByTestId("create-hunt-name");
      expect(input).toBeInTheDocument();

      expect(input).toHaveValue("");
    });

    it("VALID", async () => {
      const input = getByTestId("create-hunt-name");
      expect(input).toBeInTheDocument();

      fireEvent.input(input, { target: { value: huntName } });
      expect(input).toHaveValue(huntName);
    });

    it("INVALID", async () => {
      const input = getByTestId("create-hunt-name");
      expect(input).toBeInTheDocument();

      await act(async () => {
        input.focus();
      });
      expect(input).toHaveFocus();

      await act(async () => {
        input.blur();
      });
      expect(input).toBeInvalid();
      expect(getByText("A valid name is required.")).toBeInTheDocument();
    });
  });

  describe("Start date field", () => {
    it("DEFAULT", async () => {
      const checkbox = getByTestId("create-hunt-multiple-days");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();

      const today = dayjs().format("MM/DD/YYYY");
      const startDatePicker = getByRole("textbox", { name: "Start date" });
      expect(startDatePicker).toHaveValue(today);
    });

    it("VALID", async () => {
      const checkbox = getByTestId("create-hunt-multiple-days");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();

      const startDatePicker = getByRole("textbox", { name: "Start date" });
      fireEvent.input(startDatePicker, {
        target: { value: startDateFormatted },
      });
      expect(startDatePicker).toHaveValue(startDateFormatted);
    });

    it("INVALID", async () => {
      const checkbox = getByTestId("create-hunt-multiple-days");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();

      const dayInPast = dayjs().subtract(2, "days").format("MM/DD/YYYY");
      const startDatePicker = getByRole("textbox", { name: "Start date" });
      await act(async () => {
        fireEvent.input(startDatePicker, {
          target: { value: dayInPast },
        });
        startDatePicker.focus();
      });
      expect(startDatePicker).toHaveValue(dayInPast);

      await act(async () => {
        startDatePicker.blur();
      });
      expect(startDatePicker).toBeInvalid();
    });
  });

  describe("End date field", () => {
    it("DEFAULT", async () => {
      const checkbox = getByTestId("create-hunt-multiple-days");
      expect(checkbox).toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      const tomorrow = dayjs().add(1, "day").format("MM/DD/YYYY");
      const endDatePicker = getByRole("textbox", { name: "End date" });
      expect(endDatePicker).toBeInTheDocument();
      expect(endDatePicker).toHaveValue(tomorrow);
    });

    it("VALID", async () => {
      const checkbox = getByTestId("create-hunt-multiple-days");
      expect(checkbox).toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      const endDatePicker = getByRole("textbox", { name: "End date" });
      expect(endDatePicker).toBeInTheDocument();
      fireEvent.input(endDatePicker, { target: { value: endDateFormatted } });
      expect(endDatePicker).toHaveValue(endDateFormatted);
    });

    it("INVALID", async () => {
      const checkbox = getByTestId("create-hunt-multiple-days");
      expect(checkbox).toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      const dayInPast = dayjs().subtract(1, "day").format("MM/DD/YYYY");
      const endDatePicker = getByRole("textbox", { name: "End date" });
      await act(async () => {
        fireEvent.input(endDatePicker, {
          target: { value: dayInPast },
        });
        endDatePicker.focus();
      });
      expect(endDatePicker).toHaveValue(dayInPast);

      await act(async () => {
        endDatePicker.blur();
      });
      expect(endDatePicker).toBeInvalid();
    });
  });

  describe("Recall message field", () => {
    it("DEFAULT", async () => {
      const input = getByTestId("create-hunt-recall-message");
      expect(input).toBeInTheDocument();

      expect(input).toHaveValue("");
    });

    it("VALID", async () => {
      const input = getByTestId("create-hunt-recall-message");
      expect(input).toBeInTheDocument();

      fireEvent.input(input, { target: { value: recallMsg } });
      expect(input).toHaveValue(recallMsg);
    });

    it("INVALID", async () => {
      const input = getByTestId("create-hunt-recall-message");
      expect(input).toBeInTheDocument();

      fireEvent.input(input, { target: { value: 123 } });
      await act(async () => {
        input.focus();
      });
      expect(input).toHaveFocus();

      await act(async () => {
        input.blur();
      });
      expect(input).toBeInvalid();
      expect(
        getByText("A valid recall message is required.")
      ).toBeInTheDocument();
    });
  });

  describe("Completed form", () => {
    beforeEach(async () => {
      // FILL FORM VALUES
      fireEvent.click(getByTestId("create-hunt-multiple-days"));
      const nameInput = getByTestId("create-hunt-name");
      await act(async () => {
        fireEvent.input(nameInput, {
          target: { value: huntName },
        });
        nameInput.focus();
      });

      const recallInput = getByTestId("create-hunt-recall-message");
      await act(async () => {
        fireEvent.input(recallInput, {
          target: { value: recallMsg },
        });
        recallInput.focus();
      });

      const startDateInput = getByRole("textbox", { name: "Start date" });
      await act(async () => {
        fireEvent.input(startDateInput, {
          target: { value: startDateFormatted },
        });
        startDateInput.focus();
      });

      const endDateInput = getByRole("textbox", { name: "End date" });
      await act(async () => {
        fireEvent.input(endDateInput, {
          target: { value: endDateFormatted },
        });
        endDateInput.focus();
      });
    });

    it("submit is fired", async () => {
      // TEST FORM ACTIONS
      const confirmBtn = getByRole("button", { name: "Create Hunt" });
      expect(confirmBtn).not.toBeDisabled();
      fireEvent.submit(confirmBtn);
      await waitFor(() => {
        expect(mockedCreate).toHaveBeenCalled();
        expect(handleCloseMock).toBeCalledTimes(1);
      });
    });
  });
});
