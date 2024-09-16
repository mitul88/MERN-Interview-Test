import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// import HomePage from "../pages/HomePage";
// import DrawingPage from "../pages/DrawingPage";

const HomePage = lazy(() => import("../pages/HomePage"));
const DrawingPage = lazy(() => import("../pages/DrawingPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/whiteboard",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <DrawingPage />
      </Suspense>
    ),
  },
]);
