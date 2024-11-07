import { lazy } from "react";

// Lazy load HomePage with a delay
export const HomePage = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("routes/HomePage")), 2000); // Delay in milliseconds
    }),
);

export const NotFoundPage = lazy(() => import("routes/NotFoundPage"));
