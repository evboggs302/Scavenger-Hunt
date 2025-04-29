import { HttpResponse, graphql } from "msw";
import { GetUserFromTokenDocument } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

const user_id = hexadecimalStr();

export const getUserFromTokenMock = graphql.query(
  GetUserFromTokenDocument,
  () => {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    return HttpResponse.json({
      data: {
        user: {
          __typename: "UserPayload" as const,
          _id: user_id,
          first_name,
          last_name,
          user_name: faker.internet.username({
            firstName: first_name,
            lastName: last_name,
          }),
          account: faker.string.uuid(),
          email: faker.internet.email({
            firstName: first_name,
            lastName: last_name,
            provider: "example.scavenger.com",
          }),
        },
      },
    });
  }
);
