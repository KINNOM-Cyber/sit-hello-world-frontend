import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { BookingDetailProvider } from "./contexts/useBookingDetail";

const queryClient = new QueryClient({});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookingDetailProvider>
        <RouterProvider router={router} />
      </BookingDetailProvider>
    </QueryClientProvider>
  </StrictMode>
);
