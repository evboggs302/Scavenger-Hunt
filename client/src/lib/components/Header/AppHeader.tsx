import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, MenuProps } from "antd";
import { ApolloError } from "@apollo/client/errors";
import { useToast } from "../../hooks/useToast";
import { useLogoutMutation } from "./useLogoutMutation";
import { LogoutOutlined } from "@ant-design/icons";
import { MenuContainer, StyledTitle } from "./headerLayout";

const { Header } = Layout;

export const AppHeader = () => {
  const navigate = useNavigate();
  const { toastError } = useToast();
  const [logoutUser, { loading }] = useLogoutMutation();

  const onClick = async () => {
    try {
      await logoutUser();
    } catch (err) {
      if (err instanceof ApolloError) {
        toastError({ title: "Trouble logging out", message: err.message });
      } else {
        toastError({ message: "There was an error trying to logout." });
      }
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    // {
    //   key: "account-link",
    //   label: "Account",
    //   onClick: () => navigate("/account"),
    // },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        margin: 0,
        padding: "0 28",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
      <StyledTitle />
      <MenuContainer>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          style={{ minWidth: 200, justifyContent: "flex-start" }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: "logout-btn",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick,
              disabled: loading,
            },
          ]}
          style={{ minWidth: 200, justifyContent: "flex-end" }}
        />
      </MenuContainer>
    </Header>
  );
};
