import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Controller } from "react-hook-form";
import { useClueContext } from "@lib/context/ClueContext";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useFiltersFormContext } from "@features/results/hooks/useFiltersFormContext";
import InputLabel from "@mui/material/InputLabel";
import { FilterMeuItem } from "./FilterMenuItem";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const ClueFilter: React.FC = () => {
  const { data } = useClueContext();
  const { control } = useFiltersFormContext();
  const clues = data?.clues?.filter((clu) => !!clu) || [];

  return (
    <Box sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-chip-label">Clues</InputLabel>
      <Controller
        control={control}
        name="clueFilter"
        render={({ field }) => (
          <Select
            multiple
            value={field.value}
            onChange={field.onChange}
            MenuProps={MenuProps}
            input={<OutlinedInput sx={{ width: 300 }} />}
            inputProps={{ "aria-label": "Filter by clue" }}
            renderValue={(selected: string[]) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={clues.find(({ _id }) => _id === value)?.description}
                  />
                ))}
              </Box>
            )}
          >
            {clues.map(({ _id, description }) => (
              <MenuItem key={_id} value={_id}>
                <FilterMeuItem
                  itemText={description}
                  isChecked={field.value?.some((val) => val === _id)}
                />
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Box>
  );
};
