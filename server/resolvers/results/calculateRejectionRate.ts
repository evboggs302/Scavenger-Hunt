import { ResultsFilters } from "@generated/graphql";
import { throwResolutionError } from "@utils/apolloErrorHandlers";

type CalculateRejectionRateArg = {
  filters: ResultsFilters[];
  huntId: string;
};

export const calculateRejectionRate = async ({
  filters,
  huntId,
}: CalculateRejectionRateArg): Promise<number> => {
  try {
    return 0;
  } catch (err) {
    return throwResolutionError({
      message: "Unable to provide reuslts for the given filters.",
      err,
    });
  }
};
