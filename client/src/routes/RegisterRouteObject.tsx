import { AuthOutlet } from "@pages/auth/AuthOutlet";
import { SignUpCard } from "@pages/auth/SignUpCard";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";

export const RegisterRouteObject = {
  path: "register",
  element: <AuthOutlet />,
  children: [
    {
      index: true,
      element: <SignUpCard />,
    },
    catchallRouteToParent,
  ],
};
