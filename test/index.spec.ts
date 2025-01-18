import { logger } from '../src/index';

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleDebugSpy.mockRestore();
  });

  it("should log a message with an optional parameter when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test log message';
    const additionalParam = { key: 'value' };

    logger.log(message, additionalParam);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[LOG\] .*: Test log message \{"key":"value"\}/)
    );
  });

  it("should log a message without an optional parameter when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test log message';

    logger.log(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[LOG\] .*: Test log message/)
    );
  });

  it("should warn a message with an optional parameter when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test warn message';
    const additionalParam = [1, 2, 3];

    logger.warn(message, additionalParam);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[WARN\] .*: Test warn message \[1,2,3\]/)
    );
  });

  it("should error a message with an optional parameter when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test error message';
    const additionalParam = 'extra details';

    logger.error(message, additionalParam);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[ERROR\] .*: Test error message extra details/)
    );
  });

  it("should debug a message with an optional parameter when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test debug message';
    const additionalParam = { debug: true };

    logger.debug(message, additionalParam);

    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[DEBUG\] .*: Test debug message \{"debug":true\}/)
    );
  });

  it("should not log, warn, error, or debug a message when NODE_ENV is 'production'", () => {
    process.env.NODE_ENV = 'production';
    const message = 'Test message';
    const additionalParam = { ignored: true };

    logger.log(message, additionalParam);
    logger.warn(message, additionalParam);
    logger.error(message, additionalParam);
    logger.debug(message, additionalParam);

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleDebugSpy).not.toHaveBeenCalled();
  });
});
