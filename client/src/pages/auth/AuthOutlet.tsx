import React from "react";
import { Outlet } from "react-router-dom";
import { AppFooter } from "@lib/components/Footer/AppFooter";
import { SignInSide } from "./SignInSide";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AuthOutlet = () => {
  return (
    <StyledContainer>
      <SignInSide />
      <Outlet />
    </StyledContainer>
  );
};
