/**
 * @module Logger
 *
 * This module provides a simple logging utility for the application. It includes
 * functions to log messages of different severity levels: debug, log, error, and warn.
 * The logging functions output messages to the console, but only when the application
 * is not running in a production environment. This is controlled by checking the
 * `NODE_ENV` environment variable.
 *
 * The logger is designed to help developers track the flow of the application and
 * diagnose issues during development and testing. By suppressing log output in
 * production, it helps to keep the console output clean and avoids exposing potentially
 * sensitive information.
 *
 * Usage:
 *
 * Import the logger and use the appropriate method to log messages:
 *
 * ```typescript
 * import { logger } from './logger';
 *
 * logger.log('This is a log message');
 * logger.error('This is an error message');
 * logger.warn('This is a warning message');
 * logger.debug('This is a debug message');
 * ```
 *
 * Each log message is prefixed with a timestamp and a label indicating the log level.
 *
 * Functions:
 * - `logMessage(message: string, data?: unknown): void`: Logs a standard message.
 * - `errorMessage(message: string, data?: unknown): void`: Logs an error message.
 * - `warnMessage(message: string, data?: unknown): void`: Logs a warning message.
 * - `debugMessage(message: string, data?: unknown): void`: Logs a debug message.
 *
 * The logger object aggregates these functions for easy access.
 */
type LoggerFunction = (message: string, data?: unknown) => void;

export const logger: Record<
  'debug' | 'log' | 'error' | 'warn',
  LoggerFunction
> = {
  debug: debugMessage,
  log: logMessage,
  error: errorMessage,
  warn: warnMessage,
};

function formatMessage(level: string, message: string, data?: unknown): string {
  const timestamp = new Date().toISOString();
  const formattedData =
    data !== undefined
      ? typeof data === 'object'
        ? ` ${JSON.stringify(data)}`
        : ` ${String(data)}`
      : '';
  return `[${level.toUpperCase()}] ${timestamp}: ${message}${formattedData}`;
}

function logMessage(message: string, data?: unknown): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log(formatMessage('LOG', message, data));
  }
}

function errorMessage(message: string, data?: unknown): void {
  if (process.env.NODE_ENV !== 'production') {
    console.error(formatMessage('ERROR', message, data));
  }
}

function warnMessage(message: string, data?: unknown): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(formatMessage('WARN', message, data));
  }
}

function debugMessage(message: string, data?: unknown): void {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(formatMessage('DEBUG', message, data));
  }
}
