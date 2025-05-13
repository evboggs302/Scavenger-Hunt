import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { FetchAccountTransactionsDocument } from "@generated/graphql";

export const useFetchAccountTransactions = () => {
  const [subscriptStatus, setSubStatus] = useState<
    "active" | "inactive" | null
  >(null);

  const { data, loading } = useQuery(FetchAccountTransactionsDocument, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!data?.subscription || data.subscription.status !== "active") {
      setSubStatus("inactive");
    } else {
      setSubStatus("active");
    }
  }, [data?.subscription]);

  return useMemo(
    () => ({
      subscription: data?.subscription,
      charges: data?.charges,
      loading,
      subscriptStatus,
    }),
    [data?.charges, data?.subscription, loading, subscriptStatus]
  );
};
