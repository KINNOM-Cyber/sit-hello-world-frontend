import { createRoute } from "@tanstack/react-router";

import { rootRoute } from ".";
import HomePage  from "../pages/HomePage";

export const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: HomePage,
});
