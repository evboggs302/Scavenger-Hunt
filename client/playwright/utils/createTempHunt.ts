import { request } from "playwright/test";
import { createFakeDates } from "./createFakeDates";

export const createTempHunt = async (filePath: string) => {
  const { startDate, endDate } = createFakeDates();

  const context = await request.newContext({ storageState: filePath });
  const authToken = (await context.storageState()).origins[0].localStorage.find(
    (item) => item.name === "BEARER_TOKEN"
  )?.value;

  const response = await context.post(`${process.env.SERVER_URL_GQL}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${process.env.CLIENT_URL}`,
      authorization: `${authToken}`,
    },
    data: {
      operationName: "CreateHunt",
      variables: {
        name: "Temporary Hunt",
        start_date: startDate,
        end_date: endDate,
        recallMessage: "This is a temporary hunt",
        multipleDays: true,
      },
      query: `
        mutation CreateHunt(
          $name: String!
          $start_date: String!
          $end_date: String!
          $recall_message: String
        ) {
          hunt: createHunt(
            input: {
              name: $name
              start_date: $start_date
              end_date: $end_date
              recall_message: $recall_message
            }
          ) {
              _id
              created_by
              name
              created_date
              start_date
              end_date
              is_active
              marked_complete
              recall_message
              twilio_number
          }
        }
      `,
    },
  });

  const { data } = await response.json();
  return data.hunt;
};
