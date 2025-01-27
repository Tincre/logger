/**
 * @module Logger
 *
 * This module provides a simple logging utility for the application. It includes
 * functions to log messages of different severity levels: debug, log, error, and warn.
 * The logging functions output messages to the console, but only when allowed by the
 * provided configuration. This is controlled by the `LoggerConfig` object.
 *
 * The logger is designed to help developers track the flow of the application and
 * diagnose issues during development and testing. By suppressing log output in
 * production, it helps to keep the console output clean and avoids exposing potentially
 * sensitive information.
 *
 * Usage:
 *
 * Import and use the default logger or instantiate a custom one:
 *
 * ```typescript
 * import { logger, Logger, LoggerConfig } from '@tincre/logger';
 *
 * logger.log('This is a log message');
 * logger.error('This is an error message');
 * logger.warn('This is a warning message');
 * logger.debug('This is a debug message');
 *
 * const customLogger = new Logger({ logLevel: 'debug', isProduction: false });
 * customLogger.log('This is a custom log message');
 * ```
 *
 * Each log message is prefixed with a timestamp and a label indicating the log level.
 *
 * Class:
 * - `Logger(config?: Partial<LoggerConfig>)`: Creates a new logger instance with the given configuration.
 *
 * Methods:
 * - `log(message: string, data?: unknown): void`: Logs a standard message.
 * - `error(message: string, data?: unknown): void`: Logs an error message.
 * - `warn(message: string, data?: unknown): void`: Logs a warning message.
 * - `debug(message: string, data?: unknown): void`: Logs a debug message.
 */

// src/config.ts
export const LOG_LEVELS = ['debug', 'log', 'warn', 'error'] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

export interface LoggerConfig {
  logLevel: LogLevel;
  isProduction: boolean;
}

export function createLoggerConfig(
  config: Partial<LoggerConfig> = {}
): LoggerConfig {
  return {
    logLevel:
      config.logLevel && LOG_LEVELS.includes(config.logLevel)
        ? config.logLevel
        : 'debug',
    isProduction: config.isProduction ?? false,
  };
}

export class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = createLoggerConfig(config);
  }

  private shouldLog(level: LogLevel): boolean {
    return (
      LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(this.config.logLevel)
    );
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown> | string | number | boolean
  ): string {
    const timestamp = new Date().toISOString();

    const formattedData = data
      ? ` ${typeof data === 'object' ? JSON.stringify(data) : String(data)}`
      : '';
    return `[${level.toUpperCase()}] ${timestamp}: ${message}${formattedData}`;
  }

  log(
    message: string,
    data?: Record<string, unknown> | string | number | boolean
  ): void {
    if (this.config.isProduction || !this.shouldLog('log')) return;
    console.log(this.formatMessage('log', message, data));
  }

  error(
    message: string,
    data?: Record<string, unknown> | string | number | boolean
  ): void {
    if (this.config.isProduction || !this.shouldLog('error')) return;
    console.error(this.formatMessage('error', message, data));
  }

  warn(
    message: string,
    data?: Record<string, unknown> | string | number | boolean
  ): void {
    if (this.config.isProduction || !this.shouldLog('warn')) return;
    console.warn(this.formatMessage('warn', message, data));
  }

  debug(
    message: string,
    data?: Record<string, unknown> | string | number | boolean
  ): void {
    if (this.config.isProduction || !this.shouldLog('debug')) return;
    console.debug(this.formatMessage('debug', message, data));
  }
}

export const logger = new Logger();
export { LoggerConfig };
