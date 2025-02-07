import { createRoute } from "@tanstack/react-router";

import { rootRoute } from ".";
import BookingPage from "../pages/BookingPage";


export const bookingRoute = createRoute({
  path: "/booking",
  getParentRoute: () => rootRoute,
  component: BookingPage,
});
