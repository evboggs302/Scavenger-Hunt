import { faker } from "@faker-js/faker";
import { ResponsePayload } from "@generated/graphql";

export const generateResponses = (number: number = 1, clue_id: string) => {
  const teamIDs = [
    faker.string.hexadecimal(),
    faker.string.hexadecimal(),
    faker.string.hexadecimal(),
  ];

  const responses = new Array<ResponsePayload>(number);
  for (let i = 0; i < number; i++) {
    responses[i] = {
      __typename: "ResponsePayload" as const,
      _id: faker.string.hexadecimal(),
      team_id: teamIDs[faker.number.int({ min: 0, max: 2 })],
      clue_id,
      time_received: faker.date.recent({ days: 3 }).toISOString(),
      correct: faker.datatype.boolean(),
      hint_sent: faker.datatype.boolean(),
      response_txt: faker.lorem.words(faker.number.int({ min: 0, max: 2 })),
      response_img: [faker.image.urlLoremFlickr()],
    };
  }

  return responses;
};
