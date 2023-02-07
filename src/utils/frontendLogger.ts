import pino from 'pino';
import { BASE_URL } from "./miljøUtils";

export const frontendLogger = (): pino.Logger =>
  pino({
    browser: {
      transmit: {
        send: async (_, logEvent) => {
          try {
            // If your app uses a basePath, you'll need to add it to the path here
            await fetch(`${BASE_URL}/api/logger`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(
                logEvent,
              ),
            });
          } catch (e) {
            console.warn(e);
            console.warn('Unable to log to backend', logEvent);
          }
        },
      },
    },
  });
