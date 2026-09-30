import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const NotFound = () => <p className="p-8">Page not found.</p>;

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },
]);

export function AppRouter() {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}
