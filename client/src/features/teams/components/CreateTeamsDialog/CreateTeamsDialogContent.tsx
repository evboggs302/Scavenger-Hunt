import { useCallback, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import { useScrollShadow } from "@lib/hooks/useScrollShadow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CreateTeamFields } from "./CreateTeamFields";

export const CreateTeamsDialogContent = () => {
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
    setFocus(`teams[${fields.length - 1}]`, { shouldSelect: true });
  }, [append, fields.length, setFocus]);

  useEffect(() => {
    if (fields.length === 0) {
      addAnother();
    }
  }, [addAnother, fields]);

  const hasMultiple = fields ? fields.length > 1 : false;

  return (
    <FieldWrapper>
      <Box ref={ref} sx={{ maxHeight: "320px", overflowY: "auto" }}>
        {fields.map(({ id }, index) => (
          <CreateTeamFields
            key={id}
            fieldId={id}
            index={index}
            hasMultiple={hasMultiple}
            remove={remove}
          />
        ))}
      </Box>
      <Button disabled={!isValid || isSubmitting} onClick={addAnother}>
        Add another team
      </Button>
    </FieldWrapper>
  );
};
