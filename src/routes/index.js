import { createRootRoute, createRouter } from "@tanstack/react-router";

import { homeRoute } from "./home";
import { bookingRoute } from "./booking";
import { bookingDetailRoute } from "./booking-detail";
import { myBookingRoute } from "./my-booking";

const rootRoute = createRootRoute();
const routeTree = rootRoute.addChildren([homeRoute, bookingRoute, bookingDetailRoute, myBookingRoute]);
const router = createRouter({ routeTree });

export { rootRoute, router };
