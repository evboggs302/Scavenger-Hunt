import { useCallback, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import { useScrollShadow } from "@lib/hooks/useScrollShadow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MultiTeamsFields } from "./MultiTeamsFields";

export const MultipleTeamsDialogContent = () => {
  const { ref } = useScrollShadow();
  const {
    setFocus,
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "teams",
  });

  const addAnother = useCallback(() => {
    append({ members: "", device_number: "" });
    setFocus(`teams[${fields.length + 1}]`, { shouldSelect: true });
  }, [append, fields.length, setFocus]);

  useEffect(() => {
    if (fields.length === 0) {
      addAnother();
    }
  }, [addAnother, fields]);

  return (
    <FieldWrapper>
      <Box ref={ref} sx={{ maxHeight: "320px", overflowY: "auto" }}>
        {fields.map(({ id }, index) => (
          <MultiTeamsFields
            key={id}
            index={index}
            remove={() => remove(index)}
          />
        ))}
      </Box>
      <Button disabled={!isValid || isSubmitting} onClick={addAnother}>
        Add another team
      </Button>
    </FieldWrapper>
  );
};
