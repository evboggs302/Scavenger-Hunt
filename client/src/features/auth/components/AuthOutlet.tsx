import { Outlet } from "react-router";
import { AuthSidePanel } from "./AuthSidePanel";
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
      <AuthSidePanel />
      <Outlet />
    </StyledContainer>
  );
};
