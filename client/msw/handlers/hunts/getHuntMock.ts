import { HttpResponse, graphql } from "msw";
import { GetHuntDocument } from "@generated/graphql";
import { generateHunts } from "../../utils/generateHunts";

const hunt = generateHunts()[0];

export const getHuntMock = graphql.query(GetHuntDocument, () => {
  return HttpResponse.json({
    data: {
      hunt,
    },
  });
});
