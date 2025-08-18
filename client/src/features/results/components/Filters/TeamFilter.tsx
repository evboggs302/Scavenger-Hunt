import { Controller } from "react-hook-form";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useHuntContext } from "@lib/context/HuntContext";
import InputLabel from "@mui/material/InputLabel";
import { useFiltersFormContext } from "@features/results/hooks/useFiltersFormContext";
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

export const TeamFilter: React.FC = () => {
  const { data } = useHuntContext();
  const { control } = useFiltersFormContext();
  const teams = data?.hunt.teams?.filter((tm) => !!tm) || [];

  return (
    <Box sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-chip-label">Teams</InputLabel>
      <Controller
        control={control}
        name="teamFilter"
        render={({ field }) => (
          <Select
            multiple
            value={field.value ?? []}
            onChange={field.onChange}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Filter by team" }}
            input={<OutlinedInput sx={{ width: 300 }} />}
            renderValue={(selected: string[]) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={teams
                      .find(({ _id }) => _id === value)
                      ?.members.join(", ")}
                  />
                ))}
              </Box>
            )}
          >
            {teams.map(({ _id, members }) => (
              <MenuItem key={_id} value={_id}>
                <FilterMeuItem
                  itemText={members.join(", ")}
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
