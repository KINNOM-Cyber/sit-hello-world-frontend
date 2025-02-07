import { createRoute } from "@tanstack/react-router";

import { rootRoute } from ".";
import BookingDetail from "../pages/BookingDetail";

export const bookingDetailRoute = createRoute({
  path: "/booking/detail",
  getParentRoute: () => rootRoute,
  component: BookingDetail,
});
