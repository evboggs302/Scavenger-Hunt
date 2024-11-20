import React from "react";
import { useHuntContext } from "@lib/context/HuntContext";
import { ClueQryContextProvider } from "@lib/context/ClueContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocalPathname } from "./useLocalPathname";

export const HuntInfo = () => {
  const { loading, data } = useHuntContext();
  const childNavPath = useLocalPathname();
  const navigate = useNavigate();

  if (!data?.getHunt) {
    return null;
  }

  const { end_date, is_active } = data.getHunt;

  const huntIsPassed =
    !!(end_date && +end_date <= new Date().getTime()) || !!is_active;

  // if (loading) {
  //   return <Skeleton active paragraph={{ rows: 8 }} />;
  // }

  const items = [
    {
      value: ".",
      label: "Details",
    },
    {
      value: "clues",
      label: "Clues",
    },
    {
      value: "teams",
      label: "Teams",
    },
    {
      value: "responses",
      label: "Responses",
      disabled: huntIsPassed,
    },
  ];

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* <Segmented
          options={items}
          value={childNavPath}
          onChange={(value) =>
            navigate(value, {
              relative: "path",
              state: { hunt_info_selection: value },
            })
          }
        /> */}
      </div>
      <ClueQryContextProvider>
        <Outlet />
      </ClueQryContextProvider>
    </>
  );
};
