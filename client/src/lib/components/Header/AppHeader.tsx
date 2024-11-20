import React from "react";
import { useNavigate } from "react-router-dom";
import { ApolloError } from "@apollo/client/errors";
import { useLogoutMutation } from "./useLogoutMutation";
import { MenuContainer, StyledTitle } from "./headerLayout";

export const AppHeader = () => {
  const navigate = useNavigate();
  const [logoutUser, { loading }] = useLogoutMutation();

  const onClick = async () => {
    try {
      await logoutUser();
    } catch (err) {
      if (err instanceof ApolloError) {
      } else {
      }
    }
  };

  // const menuItems: MenuProps["items"] = [
  //   {
  //     key: "dashboard",
  //     label: "Dashboard",
  //     onClick: () => navigate("/dashboard"),
  //   },
  //   // {
  //   //   key: "account-link",
  //   //   label: "Account",
  //   //   onClick: () => navigate("/account"),
  //   // },
  // ];

  return (
    <></>
    // <Header
    //   style={{
    //     position: "sticky",
    //     top: 0,
    //     zIndex: 1,
    //     width: "100%",
    //     margin: 0,
    //     padding: "0 28",
    //     display: "flex",
    //     flexDirection: "row",
    //     alignItems: "center",
    //   }}>
    //   <StyledTitle />
    //   <MenuContainer>
    //     <Menu
    //       theme="dark"
    //       mode="horizontal"
    //       defaultSelectedKeys={["dashboard"]}
    //       items={menuItems}
    //       style={{ minWidth: 200, justifyContent: "flex-start" }}
    //     />
    //     <Menu
    //       theme="dark"
    //       mode="horizontal"
    //       items={[
    //         {
    //           key: "logout-btn",
    //           icon: <LogoutOutlined />,
    //           label: "Logout",
    //           onClick,
    //           disabled: loading,
    //         },
    //       ]}
    //       style={{ minWidth: 200, justifyContent: "flex-end" }}
    //     />
    //   </MenuContainer>
    // </Header>
  );
};
