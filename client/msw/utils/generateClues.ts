import { faker } from "@faker-js/faker";
import { CluePayload, ResponsePayload } from "@generated/graphql";
import { generateResponses } from "./generateResponses";
import { hexadecimalStr } from "./createHexadecimal";
import { generateResults } from "./generateResults";

type FullClue = Required<CluePayload> & {
  responses: ResponsePayload[];
};

export const generateClues = (
  number: number = 1,
  hunt_id: string = hexadecimalStr(),
  teams: string[] = [hexadecimalStr()]
) => {
  const clues: FullClue[] = [];

  for (let i = 0; i < number; i++) {
    const _id = hexadecimalStr();

    clues.push({
      __typename: "CluePayload" as const,
      _id,
      hunt_id,
      order_number: i + 1,
      description: faker.lorem.sentence(),
      responses: generateResponses(
        5,
        _id,
        teams[faker.number.int(teams.length - 1)]
      ),
      results: generateResults(),
    });
  }

  return clues;
};
