import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const mockServer = setupServer(...handlers);

mockServer.events.on("request:start", ({ request }) => {
  console.log("Outgoing req: ", request.method, request.url);
});
