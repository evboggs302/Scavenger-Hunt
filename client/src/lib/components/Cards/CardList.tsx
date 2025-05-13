import { ComponentPropsWithRef, forwardRef } from "react";
import styled from "styled-components";

const StyledCardList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: "100%",
  width: "100%",
`;

export const CardList: React.FC<ComponentPropsWithRef<"div">> = forwardRef(
  ({ style, children, ...props }, ref) => (
    <StyledCardList ref={ref} {...props} style={style}>
      {children}
    </StyledCardList>
  )
);
