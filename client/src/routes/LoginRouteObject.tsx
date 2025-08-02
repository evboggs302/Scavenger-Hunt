import { AuthOutlet } from "@pages/auth/AuthOutlet";
import { SignInCard } from "@pages/auth/SignInCard";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";

export const LoginRouteObject = {
  path: "login",
  element: <AuthOutlet />,
  children: [
    {
      index: true,
      element: <SignInCard />,
    },
    catchallRouteToParent,
  ],
};
