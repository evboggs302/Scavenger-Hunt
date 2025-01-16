import { Team } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { hexadecimalStr } from "./createHexadecimal";

export const generateTeams = (
  number: number = 1,
  hunt_id: string = hexadecimalStr()
) => {
  const teams: Team[] = [];
  for (let i = 0; i < number; i++) {
    teams.push({
      __typename: "Team" as const,
      _id: hexadecimalStr(),
      hunt_id,
      device_number: faker.phone.number({ style: "national" }),
      members: [
        faker.person.fullName(),
        faker.person.fullName(),
        faker.person.fullName(),
      ],
      last_clue_sent: faker.number.int({ min: 1, max: 3 }),
      recall_sent: faker.datatype.boolean(),
    });
  }

  return teams;
};
