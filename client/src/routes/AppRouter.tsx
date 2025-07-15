import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import { LoginRouteObject } from "./LoginRouteObject";
// import { RegisterRouteObject } from "./RegisterRouteObject";
import { AppRouteObject } from "./AppRouteObject";
import { catchallRouteToLogin } from "./catchAllRoutes/catchallRouteToLogin";

const router = createBrowserRouter([
  LoginRouteObject,
  // RegisterRouteObject,
  AppRouteObject,
  catchallRouteToLogin,
]);

export const AppRouter = () => <RouterProvider router={router} />;
