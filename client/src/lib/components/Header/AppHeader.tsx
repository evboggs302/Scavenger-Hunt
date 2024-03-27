import React from "react";
import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";
import { ApolloError } from "@apollo/client/errors";
import { useToast } from "../../hooks/useToast";
import { useLogoutMutation } from "./useLogoutMutation";
import { useUserContext } from "../../context/user/context/useUserContext";

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader = () => {
  const { toastError } = useToast();
  const [logoutUser, { loading }] = useLogoutMutation();
  const { first_name } = useUserContext();

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

  return (
    <Header>
      <Title style={{ color: "white" }}>{first_name}</Title>
      <nav>
        <h3>
          <Link to="/dashboard">Home</Link>
        </h3>
        <h3>
          <Link to="/hunt">Hunt Info</Link>
        </h3>
        <h3>
          <Link to="/clues">Clues</Link>
        </h3>
        <h3>
          <Link to="/teams">Teams</Link>
        </h3>
        <h3>
          <Link to="/responses">Responses</Link>
        </h3>
        <h3>
          <button disabled={loading} onClick={onClick}>
            LOGOUT
          </button>
        </h3>
      </nav>
    </Header>
  );
};
