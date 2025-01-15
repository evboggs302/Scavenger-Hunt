import { Hunt } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { generateTeams } from "./generateTeams";

export const generateHunts = (
  number: number = 1,
  created_by = faker.string.hexadecimal()
): Hunt[] => {
  const hunts = new Array<Hunt>(number);

  for (let i = 0; i < number; i++) {
    const _id = faker.string.hexadecimal();
    const start_date = faker.date.future().toISOString();
    hunts[i] = {
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
    };
  }

  return hunts;
};
