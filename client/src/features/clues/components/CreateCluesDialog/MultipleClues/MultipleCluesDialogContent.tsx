import { useCallback, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import Box from "@mui/material/Box";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import { MultiDescriptionField } from "./MultiDescriptionField";
import { AddAnotherClueBlutton } from "./AddAnotherClueBlutton";
import { useScrollShadow } from "@lib/hooks/useScrollShadow";

export const MultipleCluesDialogContent = () => {
  const { ref } = useScrollShadow();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "cluesList",
    }
  );

  const addAnother = useCallback(() => {
    append("");
  }, [append]);

  useEffect(() => {
    if (fields.length === 0) {
      addAnother();
    }
  }, [addAnother, fields]);

  return (
    <FieldWrapper>
      <Box ref={ref} sx={{ maxHeight: "300px", overflowY: "auto" }}>
        {fields.map(({ id }, index) => (
          <MultiDescriptionField
            key={id}
            index={index}
            remove={() => remove(index)}
          />
        ))}
      </Box>
      <AddAnotherClueBlutton onClick={addAnother} />
    </FieldWrapper>
  );
};
