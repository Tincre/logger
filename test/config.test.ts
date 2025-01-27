// test/config.test.ts
import {
  createLoggerConfig,
  shouldLog,
  LogLevel,
  LoggerConfig,
} from '../src/config';

describe('createLoggerConfig', () => {
  it('creates default config when no input is provided', () => {
    expect(createLoggerConfig()).toEqual({
      logLevel: 'debug',
      isProduction: false,
    });
  });

  it('respects provided logLevel and isProduction values', () => {
    const config = createLoggerConfig({ logLevel: 'warn', isProduction: true });
    expect(config).toEqual({ logLevel: 'warn', isProduction: true });
  });
});

describe('shouldLog', () => {
  const config: LoggerConfig = { logLevel: 'warn', isProduction: false };

  it('returns true for messages at or above the configured level', () => {
    expect(shouldLog('warn', config)).toBe(true);
    expect(shouldLog('error', config)).toBe(true);
  });

  it('returns false for messages below the configured level', () => {
    expect(shouldLog('log', config)).toBe(false);
    expect(shouldLog('debug', config)).toBe(false);
  });
});
