import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Layout, Menu, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { AimOutlined, HomeOutlined } from "@ant-design/icons";
import { GetHuntsByUserIdDocument } from "../../../generated/graphql";
import { apolloContextHeaders } from "../../../../apolloClient/apolloContextHeaders";

const { Sider } = Layout;

export const SidePanel = () => {
  const homeItem = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/dashboard"),
    },
  ];

  const [panelItems, setPanelItems] = useState(homeItem);
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
        setPanelItems([...homeItem, ...huntItems]);
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
    <Sider
      width={350}
      style={{ height: "calc(100vh - 134px)", background: "white" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["home"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
};
