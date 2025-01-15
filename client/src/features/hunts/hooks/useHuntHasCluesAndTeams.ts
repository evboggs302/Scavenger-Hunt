import { useClueContext } from "@/lib/context/ClueContext";
import { useHuntContext } from "@/lib/context/HuntContext";
import { useMemo } from "react";

/**
 * @info Checks to see if the hunt has CLUES and TEAMS created before being allowed to activate
 */
export const useHuntHasCluesAndTeams = (): {
  huntHasCluesAndTeams: boolean;
} => {
  const { data: huntData } = useHuntContext();
  const { data: clueData } = useClueContext();

  const teams = huntData?.hunt.teams?.filter((tm) => !!tm.__typename);
  const clues = clueData?.clues.filter((clu) => !!clu?.__typename);

  return useMemo(() => {
    return {
      huntHasCluesAndTeams:
        (teams && teams.length > 0 && clues && clues.length > 0) || false,
    };
  }, [clues, teams]);
};
