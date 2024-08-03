import { logger } from "@/lib/logger";
import { useEffect } from "react";

export function useKey(key: string, callback: (event: KeyboardEvent) => void) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event);
      }
    };

    window.addEventListener("keydown", handler);

    logger.info("useKey", key, callback.name);

    return () => window.removeEventListener("keydown", handler);
  }, [key, callback]);
}
