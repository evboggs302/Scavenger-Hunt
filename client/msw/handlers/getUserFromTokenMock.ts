import { HttpResponse, graphql } from "msw";
import { GetUserFromTokenDocument } from "@generated/graphql";
import { faker } from "@faker-js/faker";

export const getUserFromTokenMock = graphql.query(
  GetUserFromTokenDocument,
  () => {
    return HttpResponse.json({
      data: {
        user: {
          __typename: "UserPayload" as const,
          _id: faker.string.hexadecimal(),
          user_name: faker.internet.username(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
        },
      },
    });
  }
);
