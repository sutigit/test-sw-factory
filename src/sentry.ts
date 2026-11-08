export interface SentryCrashUtilities {
  crashUncaught: () => void;
  crashCaught: () => void;
}

export interface CrashDetonatorApi {
  crashUncaught: () => void;
  crashCaught: () => void;
}

declare global {
  interface Window {
    sentry: SentryCrashUtilities;
  }
}

let crashDetonator: CrashDetonatorApi | null = null;

export function registerCrashDetonator(
  detonator: CrashDetonatorApi | null,
): void {
  crashDetonator = detonator;
}

function requireCrashDetonator(): CrashDetonatorApi {
  if (crashDetonator === null) {
    throw new Error("Crash detonator is not mounted");
  }

  return crashDetonator;
}

export function initSentryCrashUtilities(): void {
  window.sentry = {
    crashUncaught: () => {
      requireCrashDetonator().crashUncaught();
    },
    crashCaught: () => {
      requireCrashDetonator().crashCaught();
    },
  };
}

initSentryCrashUtilities();
