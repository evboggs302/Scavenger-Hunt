import { useLocation } from "react-router";

export const useLocalPathname = () => {
  const { pathname } = useLocation();
  switch (true) {
    case /clues/.test(pathname):
      return "clues";
    case /teams/.test(pathname):
      return "teams";
    case /responses/.test(pathname):
      return "responses";
    default:
      return ".";
  }
};
