import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GetHuntsByUserIdDocument } from "@generated/graphql";
import { apolloContextHeaders } from "@apolloClient/apolloContextHeaders";
import { CreateHuntButton } from "@pages/createHuntModal/CreateHuntButton";
import { Layout, Menu, Skeleton } from "antd";
import { AimOutlined, HomeOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export const SidePanel = () => {
  const navigate = useNavigate();
  const headers = apolloContextHeaders();
  const { id } = useParams();
  const [selectedKey, setSelectedKey] = useState(id || "home");
  const homeItem = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => {
        setSelectedKey("home");
        navigate(".", { relative: "path" });
      },
    },
  ];

  const [panelItems, setPanelItems] = useState(homeItem);

  const { loading } = useQuery(GetHuntsByUserIdDocument, {
    context: headers,
    fetchPolicy: "cache-and-network",
    pollInterval: 30000,
    onCompleted: ({ getHuntsByUserId }) => {
      const huntItems = getHuntsByUserId?.map((hunt) => {
        return {
          key: hunt?._id as string,
          icon: <AimOutlined />,
          label: hunt?.name || "Unknown hunt",
          onClick: () => {
            setSelectedKey(hunt?._id as string);
            navigate(`hunt/${hunt?._id}`, { relative: "path" });
          },
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
          key: "skeleton01",
          label: <Skeleton active />,
        },
        {
          key: "skeleton02",
          label: <Skeleton active />,
        },
        {
          key: "skeleton03",
          label: <Skeleton active />,
        },
      ];

  return (
    <Sider
      width={350}
      style={{ height: "calc(100vh - 182px)", background: "white" }}>
      <CreateHuntButton />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
};
