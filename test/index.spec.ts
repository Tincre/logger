import { logger } from '../src/index';

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
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
});
