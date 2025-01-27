// src/logger.test.ts
import { Logger, logger } from '../src/logger';
import { LoggerConfig } from '../src/config';

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('logs messages at the correct levels', () => {
    logger.log('Log message');
    logger.error('Error message');
    logger.warn('Warning message');
    logger.debug('Debug message');

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Log message')
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error message')
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Warning message')
    );
    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringContaining('Debug message')
    );
  });

  it('does not log in production mode', () => {
    const prodLogger = new Logger({ isProduction: true });

    prodLogger.log('Should not log');
    prodLogger.error('Should not log');
    prodLogger.warn('Should not log');
    prodLogger.debug('Should not log');

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleDebugSpy).not.toHaveBeenCalled();
  });

  it('respects log level settings', () => {
    const config: LoggerConfig = { logLevel: 'warn', isProduction: false };
    const warnLogger = new Logger(config);

    warnLogger.log('Should not log');
    warnLogger.error('Should log error');
    warnLogger.warn('Should log warning');
    warnLogger.debug('Should not log');

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Should log error')
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Should log warning')
    );
    expect(consoleDebugSpy).not.toHaveBeenCalled();
  });
});
