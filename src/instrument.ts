import * as Sentry from "@sentry/react";

const TRACES_SAMPLE_RATE = 1.0;
const REPLAY_SESSION_SAMPLE_RATE = 0.1;
const REPLAY_ON_ERROR_SAMPLE_RATE = 1.0;

const dsn = import.meta.env.VITE_SENTRY_DSN;

// Without a DSN (local or CI builds without secrets) the SDK stays uninitialised.
if (dsn) {
  Sentry.init({
    dsn,
    release: __APP_RELEASE_TAG__,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
      Sentry.feedbackIntegration({ colorScheme: "system" }),
    ],
    tracesSampleRate: TRACES_SAMPLE_RATE,
    replaysSessionSampleRate: REPLAY_SESSION_SAMPLE_RATE,
    replaysOnErrorSampleRate: REPLAY_ON_ERROR_SAMPLE_RATE,
  });
}
