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

  it("should log a message when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test log message';

    logger.log(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[LOG\] .*: Test log message/)
    );
  });

  it("should not log a message when NODE_ENV is 'production'", () => {
    process.env.NODE_ENV = 'production';
    const message = 'Test log message';

    logger.log(message);

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it("should warn a message when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test warn message';

    logger.warn(message);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[WARN\] .*: Test warn message/)
    );
  });

  it("should not warn a message when NODE_ENV is 'production'", () => {
    process.env.NODE_ENV = 'production';
    const message = 'Test warn message';

    logger.warn(message);

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("should error a message when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test error message';

    logger.error(message);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[ERROR\] .*: Test error message/)
    );
  });

  it("should not error a message when NODE_ENV is 'production'", () => {
    process.env.NODE_ENV = 'production';
    const message = 'Test error message';

    logger.error(message);

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should debug a message when NODE_ENV is not 'production'", () => {
    process.env.NODE_ENV = 'development';
    const message = 'Test debug message';

    logger.debug(message);

    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[DEBUG\] .*: Test debug message/)
    );
  });

  it("should not debug a message when NODE_ENV is 'production'", () => {
    process.env.NODE_ENV = 'production';
    const message = 'Test debug message';

    logger.debug(message);

    expect(consoleDebugSpy).not.toHaveBeenCalled();
  });
});
