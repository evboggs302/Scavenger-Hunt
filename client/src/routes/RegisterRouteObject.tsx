import { AuthOutlet } from "@features/auth/components/AuthOutlet";
import { SignUpCard } from "@features/auth/components/register/SignUpCard";
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
