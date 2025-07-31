import { useCallback, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import { ClueDescriptionField } from "./ClueDescriptionField";
import { useScrollShadow } from "@lib/hooks/useScrollShadow";
import Button from "@mui/material/Button";

export const CreateCluesDialogContent = () => {
  const { ref } = useScrollShadow();
  const {
    setFocus,
    formState: { isValid, isSubmitting },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "cluesList",
  });

  const addAnother = useCallback(() => {
    append("");
    setFocus(`cluesList[${fields.length}]`, { shouldSelect: true });
  }, [append, fields.length, setFocus]);

  useEffect(() => {
    if (fields.length === 0) {
      addAnother();
    }
  }, [addAnother, fields]);

  const hasMultiple = fields ? fields.length > 1 : false;

  return (
    <FieldWrapper>
      <Box ref={ref} sx={{ maxHeight: "300px", overflowY: "auto" }}>
        {fields.map(({ id }, index) => (
          <ClueDescriptionField
            key={id}
            fieldId={id}
            index={index}
            hasMultiple={hasMultiple}
            remove={remove}
          />
        ))}
      </Box>
      <Button disabled={!isValid || isSubmitting} onClick={addAnother}>
        Add another clue
      </Button>
    </FieldWrapper>
  );
};
