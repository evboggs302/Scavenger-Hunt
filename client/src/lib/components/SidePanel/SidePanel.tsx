import React, { useEffect, useState } from "react";
import { AimOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, Skeleton } from "antd";
import { useQuery } from "@apollo/client";
import { GetHuntsByUserIdDocument } from "../../../generated/graphql";
import { useNavigate } from "react-router-dom";
import { apolloContextHeaders } from "../../../../apolloClient/apolloContextHeaders";

const { Sider } = Layout;

export const SidePanel = () => {
  const [panelItems, setPanelItems] = useState([
    {
      key: "home",
      label: "Home",
      onClick: () => navigate("/dashboard"),
    },
  ]);
  const navigate = useNavigate();
  const headers = apolloContextHeaders();

  const { loading, error } = useQuery(GetHuntsByUserIdDocument, {
    context: headers,
    fetchPolicy: "network-only",
    pollInterval: 30000,
    onCompleted: ({ getHuntsByUserId }) => {
      const huntItems = getHuntsByUserId?.map((hunt) => {
        return {
          key: hunt?._id as string,
          icon: <AimOutlined />,
          label: hunt?.name || "Unknown hunt",
          onClick: () => navigate(`hunt/${hunt?._id}`, { relative: "path" }),
        };
      });
      if (huntItems) {
        setPanelItems([...panelItems, ...huntItems]);
      }
    },
  });

  const items = !loading
    ? panelItems
    : [
        {
          key: "skeleton",
          label: <Skeleton active />,
        },
      ];

  return (
    <Sider width={200} style={{ height: 500, background: "white" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["home"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
};
