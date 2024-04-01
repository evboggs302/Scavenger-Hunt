import React from "react";
import { Segmented, Skeleton, Space } from "antd";
import { useHuntContext } from "../../lib/context/huntContext/useHuntContext";
import { ClueQryContextProvider } from "../../lib/context/clueContext/ClueQryContextProvider";
import { Outlet, useNavigate } from "react-router-dom";

export const HuntInfo = () => {
  const { loading, is_active, end_date } = useHuntContext();
  const navigate = useNavigate();

  if (loading) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

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
      disabled: !is_active,
    },
  ];

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Segmented
          options={items}
          defaultValue=""
          onChange={(value) => navigate(value, { relative: "path" })}
        />
      </div>
      <ClueQryContextProvider>
        <Outlet />
      </ClueQryContextProvider>
    </>
  );
};
