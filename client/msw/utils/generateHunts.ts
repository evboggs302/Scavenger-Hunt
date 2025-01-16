import { Hunt } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { generateTeams } from "./generateTeams";
import { hexadecimalStr } from "./createHexadecimal";

export const generateHunts = (
  number: number = 1,
  created_by = hexadecimalStr()
): Hunt[] => {
  const hunts: Hunt[] = [];
  for (let i = 0; i < number; i++) {
    const _id = hexadecimalStr();
    const start_date = faker.date.future().toISOString();
    hunts.push({
      __typename: "Hunt" as const,
      _id,
      name: faker.lorem.words(),
      created_by,
      created_date: faker.date.recent().toISOString(),
      start_date,
      end_date: faker.date.future({ refDate: start_date }).toISOString(),
      marked_complete: faker.datatype.boolean(),
      is_active: faker.datatype.boolean(),
      recall_message: "Come on back now",
      teams: generateTeams(4, _id),
    });
  }

  return hunts;
};
