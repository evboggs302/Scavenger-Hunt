import { faker } from "@faker-js/faker";
import { CluePayload } from "@generated/graphql";
import { generateResponses } from "./generateResponses";
import { hexadecimalStr } from "./createHexadecimal";

export const generateClues = (
  number: number = 1,
  hunt_id: string = hexadecimalStr()
) => {
  const clues: CluePayload[] = [];

  for (let i = 0; i < number; i++) {
    const _id = hexadecimalStr();

    clues.push({
      __typename: "CluePayload" as const,
      _id,
      hunt_id,
      order_number: i + 1,
      description: faker.lorem.sentence(),
      responses: generateResponses(5, _id),
    });
  }

  return clues;
};
