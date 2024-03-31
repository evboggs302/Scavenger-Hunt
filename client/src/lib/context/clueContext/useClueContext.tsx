import { useContext } from "react";
import { ClueContext } from "./ClueContext";

export const useClueContext = () => {
  const context = useContext(ClueContext);

  if (!context) {
    throw new Error(
      "useClueContext must be used within a ClueContext provider"
    );
  }

  return context;
};
