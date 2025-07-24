import { request } from "playwright/test";

export const deleteTempHunt = async (filePath: string, huntId: string) => {
  const context = await request.newContext({ storageState: filePath });
  const authToken = (await context.storageState()).origins[0].localStorage.find(
    (item) => item.name === "BEARER_TOKEN"
  )?.value;

  const response = await context.post(`${process.env.SERVER_URL_GQL}`, {
    timeout: process.env.CI ? 120_000 : 30_000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${process.env.CLIENT_URL}`,
      authorization: `${authToken}`,
    },
    data: {
      operationName: "DeleteHunt",
      variables: {
        hunt_id: huntId,
      },
      query: `
        mutation DeleteHunt($hunt_id: ID!) {
          deleted: deleteHuntById(id: $hunt_id)
        }
      `,
    },
  });

  const { data } = await response.json();
  return data.deleted;
};
