import { FetchDefaultPaymentMethodDocument } from "@generated/graphql";
import { useQuery } from "@apollo/client";

export const useFetchPaymentMethod = () => {
  return useQuery(FetchDefaultPaymentMethodDocument);
};
