import { faker } from "@faker-js/faker";
import { CluePayload } from "@generated/graphql";
import { generateResponses } from "./generateResponses";

export const generateClues = (
  number: number = 1,
  hunt_id: string = faker.string.hexadecimal({ length: 24 })
) => {
  const clues = new Array<CluePayload>(number);

  for (let i = 0; i < number; i++) {
    const _id = faker.string.hexadecimal({ length: 24 });

    clues[i] = {
      __typename: "CluePayload" as const,
      _id,
      hunt_id,
      order_number: i + 1,
      description: faker.lorem.sentence(),
      responses: generateResponses(5, _id),
    };
  }

  return clues;
};
