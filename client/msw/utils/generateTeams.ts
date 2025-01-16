import { Team } from "@generated/graphql";
import { faker } from "@faker-js/faker";

export const generateTeams = (
  number: number = 1,
  hunt_id: string = faker.string.hexadecimal({ length: 24 })
) => {
  const teams = new Array<Team>(number);
  for (let i = 0; i < number; i++) {
    teams[i] = {
      __typename: "Team" as const,
      _id: faker.string.hexadecimal({ length: 24 }),
      hunt_id,
      device_number: faker.phone.number({ style: "national" }),
      members: [
        faker.person.fullName(),
        faker.person.fullName(),
        faker.person.fullName(),
      ],
      last_clue_sent: faker.number.int({ min: 1, max: 3 }),
      recall_sent: faker.datatype.boolean(),
    };
  }

  return teams;
};
