import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import { registerCrashDetonator } from "./sentry.ts";

export function CrashDetonator() {
  const [shouldCrashUncaught, setShouldCrashUncaught] = useState(false);

  useEffect(() => {
    registerCrashDetonator({
      crashUncaught: () => {
        setShouldCrashUncaught(true);
      },
      crashCaught: () => {
        try {
          throw new Error("Production test: caught error");
        } catch (error) {
          Sentry.captureException(error);
          console.error("Production test: caught error successfully", error);
        }
      },
    });

    return () => {
      registerCrashDetonator(null);
    };
  }, []);

  if (shouldCrashUncaught) {
    throw new Error("Production test: uncaught error");
  }

  return null;
}
