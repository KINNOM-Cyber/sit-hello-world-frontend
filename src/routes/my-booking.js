import { createRoute } from "@tanstack/react-router";

import { rootRoute } from ".";
import MyBookingPage from "../pages/MyBookingPage";


export const myBookingRoute = createRoute({
  path: "/booking/user",
  getParentRoute: () => rootRoute,
  component: MyBookingPage,
});
