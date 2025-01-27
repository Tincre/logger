import {
  logger,
  Logger,
  createLoggerConfig,
  LoggerConfig,
  LogLevel,
  LOG_LEVELS,
} from '../src/index';

describe('index module', () => {
  it('exports logger, Logger, createLoggerConfig, LoggerConfig, LogLevel, and LOG_LEVELS', () => {
    expect(logger).toBeDefined();
    expect(Logger).toBeDefined();
    expect(createLoggerConfig).toBeDefined();
    expect(LOG_LEVELS).toBeDefined();
  });

  it('allows creating a new Logger instance', () => {
    const customLogger = new Logger({
      logLevel: 'warn' as LogLevel,
      isProduction: false,
    });
    expect(customLogger).toBeInstanceOf(Logger);
  });

  it('allows configuring log levels', () => {
    const config: LoggerConfig = createLoggerConfig({
      logLevel: 'error',
      isProduction: false,
    });
    expect(config.logLevel).toBe('error');
  });

  it('ensures LOG_LEVELS contains expected values', () => {
    expect(LOG_LEVELS).toEqual(['debug', 'log', 'warn', 'error']);
  });
});
