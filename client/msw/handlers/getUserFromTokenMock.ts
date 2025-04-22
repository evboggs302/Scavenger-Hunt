import { HttpResponse, graphql } from "msw";
import { GetUserFromTokenDocument } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

const user_id = hexadecimalStr();

export const getUserFromTokenMock = graphql.query(
  GetUserFromTokenDocument,
  () => {
    return HttpResponse.json({
      data: {
        user: {
          __typename: "UserPayload" as const,
          _id: user_id,
          user_name: faker.internet.username(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          account: faker.string.uuid(),
        },
      },
    });
  }
);
