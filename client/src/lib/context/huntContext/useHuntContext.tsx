import { useContext } from "react";
import { HuntContext } from "./HuntContext";

export const useHuntContext = () => {
  const context = useContext(HuntContext);

  if (!context) {
    throw new Error(
      "useHuntContext must be used within a HuntContext provider"
    );
  }

  return context;
};
