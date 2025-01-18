import { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { useClueContext } from "@lib/context/ClueContext";

const digitsOnlyRegex = /^\d+$/;

export const SingleClueDialogContent = () => {
  const { data } = useClueContext();
  const defaultOrderNumber = data?.clues ? data.clues.length + 1 : 1;

  const { field: orderNumberField } = useController({
    name: "clueItem.orderNumber",
    defaultValue: defaultOrderNumber,
  });
  const { field: description, fieldState: descriptionState } = useController({
    name: "clueItem.description",
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (+target.value < 1 || !digitsOnlyRegex.test(target.value)) {
        orderNumberField.onChange(defaultOrderNumber);
      } else if (+target.value > 99) {
        orderNumberField.onChange(defaultOrderNumber);
      } else {
        orderNumberField.onChange(+target.value);
      }
    },
    [defaultOrderNumber, orderNumberField]
  );

  const decrementOrderNumber = useCallback(() => {
    orderNumberField.onChange(orderNumberField.value - 1);
  }, [orderNumberField]);
  const incrementOrderNumber = useCallback(() => {
    orderNumberField.onChange(orderNumberField.value + 1);
  }, [orderNumberField]);

  return (
    <>
      <FieldWrapper>
        <InputLabel required>
          Order number <i>(1-99)</i>
        </InputLabel>
        <StyledInputRoot>
          <StyledButton
            onClick={decrementOrderNumber}
            disabled={orderNumberField.value <= 1}
          >
            <RemoveIcon />
          </StyledButton>
          <StyledInput
            type="text"
            inputMode="numeric"
            ref={orderNumberField.ref}
            name={orderNumberField.name}
            value={orderNumberField.value}
            onBlur={orderNumberField.onBlur}
            onChange={handleInputChange}
          />
          <StyledButton onClick={incrementOrderNumber}>
            <AddIcon />
          </StyledButton>
        </StyledInputRoot>
      </FieldWrapper>
      <FieldWrapper>
        <InputLabel required>
          Description <i>(5 - 256 characters)</i>
        </InputLabel>
        <TextField
          slotProps={{
            htmlInput: {
              "data-testid": "create-clue-description",
              maxLength: 256,
            },
          }}
          multiline
          inputRef={description.ref}
          name={description.name}
          value={description.value}
          onBlur={description.onBlur}
          onChange={description.onChange}
          placeholder={`ie. "Who was the first President?"`}
          error={!!descriptionState.error}
          helperText={
            descriptionState.error ? descriptionState.error.message : null
          }
          color={descriptionState.error ? "error" : "primary"}
          fullWidth
          variant="outlined"
        />
      </FieldWrapper>
    </>
  );
};

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  `
);

const StyledInput = styled("input")(
  ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.375;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
    border-radius: 8px;
    margin: 0 8px;
    padding: 10px 12px;
    outline: 0;
    min-width: 0;
    width: 4rem;
    text-align: center;
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[700] : blue[200]};
    }
  
    &:focus-visible {
      outline: 0;
    }
  `
);

const StyledButton = styled(IconButton)(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.5;
    border: 1px solid;
    border-radius: 999px;
    border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
      border-color: ${theme.palette.mode === "dark" ? blue[500] : blue[400]};
      color: ${grey[50]};
    }
  
    &:focus-visible {
      outline: 0;
    }
  
    &.increment {
      order: 1;
    }
  `
);
