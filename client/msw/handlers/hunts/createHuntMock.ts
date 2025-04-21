import { HttpResponse, graphql } from "msw";
import { CreateHuntDocument } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

export const createHuntMock = graphql.mutation(
  CreateHuntDocument,
  async ({ variables: { name, start_date, end_date, recall_message } }) => {
    const _id = hexadecimalStr();

    return HttpResponse.json({
      data: {
        hunt: {
          __typename: "Hunt" as const,
          _id,
          name,
          start_date,
          end_date,
          recall_message: recall_message || faker.lorem.words(),
          is_active: false,
          created_by: hexadecimalStr(),
          created_date: faker.date.recent({ days: 1 }).toISOString(),
          marked_complete: false,
          twilio_number: faker.phone.number(),
        },
      },
    });
  }
);
