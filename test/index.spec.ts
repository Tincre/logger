import { Logger, logger } from '../src/index';

describe('Logger Configuration', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  let customLogger: Logger;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should use default log level "log" and log messages of that level or higher', () => {
    logger.debug('This should not be logged');
    logger.log('This should be logged');
    logger.warn('This should be logged');
    logger.error('This should be logged');

    expect(consoleDebugSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should allow instantiating a custom logger with log level "debug"', () => {
    customLogger = new Logger({ logLevel: 'debug' });

    customLogger.debug('Debug message');
    customLogger.log('Log message');
    customLogger.warn('Warn message');
    customLogger.error('Error message');

    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should not log anything when isProduction is true', () => {
    customLogger = new Logger({ logLevel: 'debug', isProduction: true });

    customLogger.debug('Debug message');
    customLogger.log('Log message');
    customLogger.warn('Warn message');
    customLogger.error('Error message');

    expect(consoleDebugSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should format log messages correctly', () => {
    logger.log('Test log message');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[LOG\] .*: Test log message/)
    );
  });

  it('should format warning messages correctly', () => {
    logger.warn('Test warn message');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[WARN\] .*: Test warn message/)
    );
  });

  it('should format error messages correctly', () => {
    logger.error('Test error message');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[ERROR\] .*: Test error message/)
    );
  });

  it('should format debug messages correctly', () => {
    customLogger = new Logger({ logLevel: 'debug' });
    customLogger.debug('Test debug message');
    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[DEBUG\] .*: Test debug message/)
    );
  });

  it('should include additional parameters in log messages', () => {
    logger.log('Log with params', { key: 'value' });
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[LOG\] .*: Log with params \{"key":"value"\}/)
    );
  });
});
