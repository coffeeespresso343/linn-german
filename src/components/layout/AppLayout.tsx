import { Suspense, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

const AppLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4  focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1 pb-20 md:pb-0">
        <Suspense fallback={<p className="p-8 text-muted">Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
