import AppLayout from "@/components/layout/AppLayout";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const NotFound = () => <p className="p-8">Page not found.</p>;

const Soon = ({ title }: { title: string }) => (
  <div className="mx-auto max-w-3xl px-6 py-20">
    <h1 className="text-3xl font-semibold">{title}</h1>
    <p className="mt-2 text-muted">Coming soon...</p>
  </div>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/learn", element: <Soon title="Learn" /> },
      { path: "/practice", element: <Soon title="Practice" /> },
      { path: "/progress", element: <Soon title="Progress" /> },
      { path: "/profile", element: <Soon title="Profile" /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
