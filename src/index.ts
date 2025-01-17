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
 * - `logMessage(message: string): void`: Logs a standard message.
 * - `errorMessage(message: string): void`: Logs an error message.
 * - `warnMessage(message: string): void`: Logs a warning message.
 * - `debugMessage(message: string): void`: Logs a debug message.
 *
 * The logger object aggregates these functions for easy access.
 */

export const logger = {
  debug: debugMessage,
  log: logMessage,
  error: errorMessage,
  warn: warnMessage,
};
/**
 * Logs a message to the console if the NODE_ENV is not set to "production".
 *
 * @param message - The message to be logged.
 * @returns {void}
 */
function logMessage(message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
  }
}

/**
 * Logs an error message to the console if the NODE_ENV is not set to "production".
 *
 * @param message - The error message to be logged.
 * @returns {void}
 *
 * @example
 * errorMessage("Failed to connect to the database");
 */
function errorMessage(message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  }
}

/**
 * Logs a warning message to the console if the NODE_ENV is not set to "production".
 *
 * @param message - The warning message to be logged.
 * @returns {void}
 */
function warnMessage(message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
  }
}

/**
 * Logs a debug message to the console if the NODE_ENV is not set to "production".
 *
 * @param message - The debug message to be logged.
 * @returns {void}
 */
function debugMessage(message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`);
  }
}
