import { renderWrapper } from "@test/renderWrapper";
import { act } from "@testing-library/react";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { UpdateHuntDialog, UpdateHuntFormState } from "./UpdateHuntDialog";
import { useUpdateHuntMutation } from "../../hooks/useUpdateHuntMutation";
import dayjs, { Dayjs } from "dayjs";
import { ApolloClient } from "@apollo/client";

const mockedCreate = vi.fn<(args: UpdateHuntFormState) => Promise<void>>();
vi.mock("../../hooks/useUpdateHuntMutation");

const mockedCreateResponse = {
  loading: false,
  error: undefined,
  called: false,
  client: {} as ApolloClient<object>,
  reset: function (): void {
    throw new Error("Function not implemented.");
  },
};

describe("UpdateHuntDialog", () => {
  const { getByRole, getByTestId, getByText } = screen;

  const handleCloseMock = vi.fn();
  const huntName: string = "NEW test hunt name";
  const recallMsg: string = "NEW recall message";

  const startDate: Dayjs = dayjs().add(1, "year");
  const startDateFormatted: string = startDate.format("MM/DD/YYYY");
  const endDate: Dayjs = dayjs().add(366, "days");
  const endDateFormatted: string = endDate.format("MM/DD/YYYY");

  beforeEach(async () => {
    vi.mocked(useUpdateHuntMutation).mockReturnValue([
      mockedCreate,
      mockedCreateResponse,
    ]);

    await renderWrapper(<UpdateHuntDialog handleClose={handleCloseMock} />);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders correctly", async () => {
    expect(getByTestId("update-hunt-title")).toBeInTheDocument();
  });

  it("cancels update", async () => {
    const cancelBtn = getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    expect(handleCloseMock).toBeCalledTimes(1);
  });

  it("confirms update button is disabled before filling form", async () => {
    const updateBtn = getByRole("button", { name: "Update Hunt" });
    expect(updateBtn).toBeDisabled();
  });

  describe("Name field", () => {
    it("DEFAULT", async () => {
      const input = getByTestId("update-hunt-name");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue();
    });

    it("VALID", async () => {
      const input = getByTestId("update-hunt-name");
      expect(input).toBeInTheDocument();

      const originalValue = input.getAttribute("value");
      fireEvent.input(input, { target: { value: huntName } });
      expect(input).not.toHaveValue(originalValue);
      expect(input).toHaveValue(huntName);
    });

    it("INVALID - empty", async () => {
      const input = getByTestId("update-hunt-name");
      expect(input).toBeInTheDocument();

      await act(async () => {
        input.focus();
      });
      expect(input).toHaveFocus();

      await act(async () => {
        fireEvent.input(input, { target: { value: "" } });
        input.blur();
      });
      expect(input).toBeInvalid();
      expect(getByText("A valid name is required.")).toBeInTheDocument();
    });

    it("INVALID - value", async () => {
      const input = getByTestId("update-hunt-name");
      expect(input).toBeInTheDocument();

      await act(async () => {
        input.focus();
      });
      expect(input).toHaveFocus();

      await act(async () => {
        fireEvent.input(input, { target: { value: 123 } });
        input.blur();
      });
      expect(input).toBeInvalid();
      expect(getByText("A valid name is required.")).toBeInTheDocument();
    });
  });

  describe("Start date field", () => {
    it("DEFAULT", async () => {
      const checkbox = getByTestId("update-hunt-multiple-days");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();

      const startDatePicker = getByRole("textbox", { name: "startDate" });
      expect(startDatePicker).toHaveValue();
    });

    it("VALID - change", async () => {
      const startDatePicker = getByRole("textbox", { name: "startDate" });
      const originalValue = startDatePicker.getAttribute("value");
      fireEvent.input(startDatePicker, {
        target: { value: startDateFormatted },
      });
      expect(startDatePicker).not.toHaveValue(originalValue);
      expect(startDatePicker).toHaveValue(startDateFormatted);
    });

    it("VALID - single date only", async () => {
      const checkbox = getByTestId("update-hunt-multiple-days");
      expect(checkbox).toBeInTheDocument();

      const endDatePicker = getByRole("textbox", { name: "endDate" });
      expect(endDatePicker).toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(endDatePicker).not.toBeInTheDocument();

      const startDatePicker = getByRole("textbox", { name: "startDate" });
      const originalValue = startDatePicker.getAttribute("value");
      fireEvent.input(startDatePicker, {
        target: { value: startDateFormatted },
      });
      expect(startDatePicker).not.toHaveValue(originalValue);
      expect(startDatePicker).toHaveValue(startDateFormatted);
    });

    it("INVALID - empty", async () => {
      const startDatePicker = getByRole("textbox", { name: "startDate" });
      const originalValue = startDatePicker.getAttribute("value");
      await act(async () => {
        fireEvent.input(startDatePicker, {
          target: { value: "" },
        });
        startDatePicker.focus();
      });
      expect(startDatePicker).not.toHaveValue(originalValue);
      expect(startDatePicker).toHaveValue("MM/DD/YYYY");

      await act(async () => {
        startDatePicker.blur();
      });
      expect(startDatePicker).toBeInvalid();
    });

    it("INVALID - value", async () => {
      const dayInPast = startDate.subtract(2, "years").format("MM/DD/YYYY");
      const startDatePicker = getByRole("textbox", { name: "startDate" });
      const originalValue = startDatePicker.getAttribute("value");

      await act(async () => {
        fireEvent.input(startDatePicker, {
          target: { value: dayInPast },
        });
        startDatePicker.focus();
      });
      expect(startDatePicker).not.toHaveValue(originalValue);
      expect(startDatePicker).toHaveValue(dayInPast);

      await act(async () => {
        startDatePicker.blur();
      });
      expect(startDatePicker).toBeInvalid();
    });
  });

  describe("End date field", () => {
    it("DEFAULT", async () => {
      const endDatePicker = getByRole("textbox", { name: "endDate" });
      expect(endDatePicker).toBeInTheDocument();
      expect(endDatePicker).toHaveValue();
    });

    it("VALID", async () => {
      const endDatePicker = getByRole("textbox", { name: "endDate" });
      expect(endDatePicker).toBeInTheDocument();

      const originalValue = endDatePicker.getAttribute("value");
      fireEvent.input(endDatePicker, { target: { value: endDateFormatted } });
      expect(endDatePicker).not.toHaveValue(originalValue);
      expect(endDatePicker).toHaveValue(endDateFormatted);
    });

    it("INVALID - empty", async () => {
      const endDatePicker = getByRole("textbox", { name: "endDate" });
      await act(async () => {
        fireEvent.input(endDatePicker, {
          target: { value: "" },
        });
        endDatePicker.focus();
      });
      expect(endDatePicker).toHaveValue("MM/DD/YYYY");

      await act(async () => {
        endDatePicker.blur();
      });
      expect(endDatePicker).toBeInvalid();
    });

    it("INVALID - value", async () => {
      const dayInPast = dayjs().subtract(1, "day").format("MM/DD/YYYY");
      const endDatePicker = getByRole("textbox", { name: "endDate" });
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
      const input = getByTestId("update-hunt-recall-message");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("Come on back now");
    });

    it("VALID", async () => {
      const input = getByTestId("update-hunt-recall-message");
      expect(input).toBeInTheDocument();

      const originalValue = input.getAttribute("value");
      fireEvent.input(input, { target: { value: recallMsg } });
      expect(input).not.toHaveValue(originalValue);
      expect(input).toHaveValue(recallMsg);
    });

    it("INVALID - empty", async () => {
      const input = getByTestId("update-hunt-recall-message");
      expect(input).toBeInTheDocument();

      fireEvent.input(input, { target: { value: "" } });
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

    it("INVALID - value", async () => {
      const input = getByTestId("update-hunt-recall-message");
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
      const nameInput = getByTestId("update-hunt-name");
      await act(async () => {
        fireEvent.input(nameInput, {
          target: { value: huntName },
        });
        nameInput.focus();
      });

      const recallInput = getByTestId("update-hunt-recall-message");
      await act(async () => {
        fireEvent.input(recallInput, {
          target: { value: recallMsg },
        });
        recallInput.focus();
      });

      const startDateInput = getByRole("textbox", { name: "startDate" });
      await act(async () => {
        fireEvent.input(startDateInput, {
          target: { value: startDateFormatted },
        });
        startDateInput.focus();
      });

      const endDateInput = getByRole("textbox", { name: "endDate" });
      await act(async () => {
        fireEvent.input(endDateInput, {
          target: { value: endDateFormatted },
        });
        endDateInput.focus();
      });
    });

    it("submit is fired", async () => {
      // TEST FORM ACTIONS
      const confirmBtn = getByRole("button", { name: "Update Hunt" });
      expect(confirmBtn).not.toBeDisabled();

      fireEvent.submit(confirmBtn);
      await waitFor(() => {
        expect(mockedCreate).toHaveBeenCalled();
        expect(handleCloseMock).toBeCalledTimes(1);
      });
    });
  });
});
