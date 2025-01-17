import { CluePayload, Hunt, Team } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { generateTeams } from "./generateTeams";
import { hexadecimalStr } from "./createHexadecimal";
import { generateClues } from "./generateClues";

type FullHunt = Required<Hunt> & {
  teams: Team[];
  clues: CluePayload[];
};

export const generateHunts = (
  number: number = 1,
  created_by = hexadecimalStr()
): FullHunt[] => {
  const hunts: FullHunt[] = [];
  for (let i = 0; i < number; i++) {
    const _id = hexadecimalStr();
    const start_date = faker.date.future().toISOString();
    const is_active = faker.datatype.boolean();

    const teams = generateTeams(5, _id);
    const teamIds = teams.map((tm) => tm._id);

    hunts.push({
      __typename: "Hunt" as const,
      _id,
      name: faker.lorem.words(),
      created_by,
      created_date: faker.date.recent().toISOString(),
      start_date,
      end_date: faker.date.future({ refDate: start_date }).toISOString(),
      is_active,
      marked_complete: is_active ? false : faker.datatype.boolean(),
      recall_message: "Come on back now",
      teams,
      clues: generateClues(5, _id, teamIds),
    });
  }

  return hunts;
};
