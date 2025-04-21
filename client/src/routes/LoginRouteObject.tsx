import { AuthOutlet } from "@features/auth/components/AuthOutlet";
import { SignInCard } from "@features/auth/components/login/SignInCard";
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
