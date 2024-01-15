import { useEffect } from "react";

export default function useScrollFixed(onClick: boolean | undefined) {
  useEffect(() => {
    if (onClick) {
      document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
      return;
    }
    document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
  }, [onClick]);
}
