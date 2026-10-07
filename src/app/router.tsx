import AppLayout from "@/components/layout/AppLayout";
import { AdminRoute, GuestRoute, ProtectedRoute } from "@/features/auth/guards";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home/Home"));
const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/Auth/RegisterPage"));
const ProfilePage = lazy(() => import("@/pages/Profile/ProfilePage"));

const ContentCheck = lazy(() => import("@/pages/Dev/ContentCheck"));

const LearnPage = lazy(() => import("@/pages/Learn"));
const LevelPage = lazy(() => import("@/pages/Learn/LevelPage"));
const LessonPage = lazy(() => import("@/pages/Lesson"));

const VocabularyPage = lazy(() => import("@/pages/Vocabulary"));
const VocabularyDetailPage = lazy(
  () => import("@/pages/Vocabulary/VocabularyDetailPage"),
);
const PronunciationPage = lazy(() => import("@/pages/Pronunciation"));

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
      { path: "/learn", element: <LearnPage /> },
      { path: "/learn/:level", element: <LevelPage /> },
      { path: "/lesson/:lessonId", element: <LessonPage /> },
      { path: "/vocabulary", element: <VocabularyPage /> },
      { path: "/vocabulary/:wordId", element: <VocabularyDetailPage /> },
      { path: "/pronunciation", element: <PronunciationPage /> },

      { path: "/dev/content", element: <ContentCheck /> },

      // Guest only
      {
        element: <GuestRoute />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },

      // Signed-in users

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Soon title="Dashboard" /> },
          { path: "/progress", element: <Soon title="Progress" /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },

      {
        element: <AdminRoute />,
        children: [{ path: "/admin", element: <Soon title="Admin" /> }],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
