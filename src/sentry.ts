export interface SentryCrashUtilities {
  crashUncaught: () => never;
  crashCaught: () => void;
}

declare global {
  interface Window {
    sentry: SentryCrashUtilities;
  }
}

export function initSentryCrashUtilities(): void {
  window.sentry = {
    crashUncaught: () => {
      throw new Error("Production test: uncaught error");
    },
    crashCaught: () => {
      try {
        throw new Error("Production test: caught error");
      } catch (error) {
        console.error("Production test: caught error successfully", error);
      }
    },
  };
}

initSentryCrashUtilities();
