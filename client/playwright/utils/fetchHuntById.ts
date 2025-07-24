import { request } from "playwright/test";

export const fetchHuntById = async (filePath: string, huntId: string) => {
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
      operationName: "GetHunt",
      variables: {
        id: huntId,
      },
      query: `
        query GetHunt($id: ID!) {
            hunt: getHunt(id: $id) {
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
