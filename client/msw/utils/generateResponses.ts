import { faker } from "@faker-js/faker";
import { ResponsePayload } from "@generated/graphql";
import dayjs from "dayjs";
import { generateTeams } from "./generateTeams";
import { hexadecimalStr } from "./createHexadecimal";

export const generateResponses = (
  number: number = 1,
  clue_id: string = hexadecimalStr()
) => {
  const teams = generateTeams(4);

  const responses: ResponsePayload[] = [];
  for (let i = 0; i < number; i++) {
    responses.push({
      __typename: "ResponsePayload" as const,
      _id: hexadecimalStr(),
      team_id: teams[faker.number.int(teams.length - 1)]._id,
      clue_id,
      time_received: faker.date.recent({ days: 3 }).toISOString(),
      correct: faker.datatype.boolean(),
      hint_sent: faker.datatype.boolean(),
      response_txt: faker.lorem.words(),
      response_img: [faker.image.urlLoremFlickr()],
    });
  }

  return responses.sort((a, b) =>
    dayjs(a.time_received).isAfter(dayjs(b.time_received)) ? 1 : -1
  );
};
