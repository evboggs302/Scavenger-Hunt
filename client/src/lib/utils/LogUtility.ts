import * as Sentry from "@sentry/react";

export class LogUtility {
  static log(...args: any[]) {}

  static info(...args: any[]) {}

  static breadcrumb(...args: any[]) {}

  static error(error: unknown) {
    Sentry.captureException(error);

    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) {
        console.error(error.stack);
      }
    }
  }
}
