/** Signature of a logging function */
export interface LogFn {
  (tag: string, message: unknown, ...args: unknown[]): void;
}

/** Basic logger interface */
export interface Logger {
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  time: (tag: string) => void;
}

/** Log levels */
export type LogLevel = "log" | "warn" | "error";

const NO_OP: LogFn = () => {};

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  readonly info: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;
  readonly time = (tag: string) => {
    const key = `[${tag}]`;
    console.time(key);
    return () => console.timeEnd(key);
  };

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {};

    this.error = (tag, message, ...args) =>
      console.error(`[${tag}]`, message, ...args);

    if (level === "error") {
      this.warn = NO_OP;
      this.info = NO_OP;

      return;
    }

    this.warn = (tag, message, ...args) =>
      console.warn(`[${tag}]`, message, ...args);

    if (level === "warn") {
      this.info = NO_OP;

      return;
    }

    this.info = (tag, message, ...args) =>
      console.info(`[${tag}]`, message, ...args);
  }
}

const LOG_LEVEL: LogLevel = import.meta.env.PROD ? "warn" : "log";

export const logger = new ConsoleLogger({ level: LOG_LEVEL });
