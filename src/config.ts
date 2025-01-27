export const LOG_LEVELS = ['debug', 'log', 'warn', 'error'] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

export type LoggerConfig = {
  logLevel: LogLevel;
  isProduction: boolean;
};

export function createLoggerConfig(
  config: Partial<LoggerConfig> = {}
): LoggerConfig {
  return {
    logLevel: config.logLevel || 'debug',
    isProduction: config.isProduction ?? false,
  };
}

export function shouldLog(level: LogLevel, config: LoggerConfig): boolean {
  return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(config.logLevel);
}
