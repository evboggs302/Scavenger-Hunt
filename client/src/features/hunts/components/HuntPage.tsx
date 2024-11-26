import React from "react";
import { useHuntContext } from "@lib/context/HuntContext";
import { ClueQryContextProvider } from "@lib/context/ClueContext";
import { Outlet, useNavigate } from "react-router-dom";

export const HuntPage = () => {
  // const { loading, data } = useHuntContext();
  // const navigate = useNavigate();

  // if (!data?.hunt) {
  //   return null;
  // }

  // const { end_date, is_active } = data.hunt;

  // const huntIsPassed =
  //   !!(end_date && +end_date <= new Date().getTime()) || !!is_active;

  // if (loading) {
  //   return <Skeleton active paragraph={{ rows: 8 }} />;
  // }

  return (
    <>
      <ClueQryContextProvider>
        <Outlet />
      </ClueQryContextProvider>
    </>
  );
};
