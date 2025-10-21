import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../pages/firebase"; 

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Get the analytics instance
    const analytics = getAnalytics(app);

    // Log a page_view event when route changes
    logEvent(analytics, "page_view", {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]);
}
