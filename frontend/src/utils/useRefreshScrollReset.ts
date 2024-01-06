import { useEffect } from "react";

export default function useRefreshScrollReset() {
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);
}
