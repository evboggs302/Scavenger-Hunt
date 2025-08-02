import { ResultsFilters } from "@generated/graphql";
import { throwResolutionError } from "@utils/apolloErrorHandlers";

type CalculateAverageResponseTimeArg = {
  filters: ResultsFilters[];
  huntId: string;
};

export const calculateAverageResponseTime = async ({
  filters,
  huntId,
}: CalculateAverageResponseTimeArg): Promise<number> => {
  try {
    return 0;
  } catch (err) {
    return throwResolutionError({
      message: "Unable to provide reuslts for the given filters.",
      err,
    });
  }
};
