import { HttpResponse, graphql } from "msw";
import { GetAllResponsesByHuntIdDocument } from "@generated/graphql";
import { generateResponses } from "@msw/utils/generateResponses";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

const responses = generateResponses(15, hexadecimalStr());

export const getAllResponsesByHuntMock = graphql.query(
  GetAllResponsesByHuntIdDocument,
  () => {
    return HttpResponse.json({
      data: {
        result: {
          __typename: "ResponsesByHunt",
          count: responses.length,
          responses,
        },
      },
    });
  }
);
