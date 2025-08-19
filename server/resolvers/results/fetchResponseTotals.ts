import { ResultsFilters } from "@generated/graphql";
import { throwResolutionError } from "@utils/apolloErrorHandlers";

type FetchResponseTotalsArg = {
  filters: ResultsFilters[];
  huntId: string;
};

export const fetchResponseTotals = async ({
  filters,
  huntId,
}: FetchResponseTotalsArg): Promise<number> => {
  try {
    return 0;
  } catch (err) {
    return throwResolutionError({
      message: "Unable to provide reuslts for the given filters.",
      err,
    });
  }
};
