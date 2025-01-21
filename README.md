# @tincre/logger

[![npm package][npm-img]][npm-url]  
[![Build Status][build-img]][build-url]  
[![Downloads][downloads-img]][downloads-url]  
[![Issues][issues-img]][issues-url]  
[![Code Coverage][codecov-img]][codecov-url]  
[![Commitizen Friendly][commitizen-img]][commitizen-url]  
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Install

```bash
npm install @tincre/logger
```

## Usage

```ts
import { logger } from '@tincre/logger';

logger.debug('Debugging message');
logger.log('Application started');
logger.warn('This is a warning');
logger.error('Unexpected error occurred', new Error('Something went wrong'));
```

## API

### `logger.log(message, data?)`

Logs a standard message to the console if `NODE_ENV` is **not** set to `production`.

#### Parameters:

- `message`: **string** - The main log message.
- `data` (optional): **unknown** - Additional data (object, array, string, etc.).

#### Example:

```ts
logger.log('User logged in', { userId: 123 });
```

---

### `logger.error(message, data?)`

Logs an error message to the console if `NODE_ENV` is **not** set to `production`.

#### Parameters:

- `message`: **string** - The error message.
- `data` (optional): **unknown** - Additional error details.

#### Example:

```ts
logger.error('Database connection failed', new Error('Connection timeout'));
```

---

### `logger.warn(message, data?)`

Logs a warning message to the console if `NODE_ENV` is **not** set to `production`.

#### Parameters:

- `message`: **string** - The warning message.
- `data` (optional): **unknown** - Additional details.

#### Example:

```ts
logger.warn('Low disk space', { availableGB: 2 });
```

---

### `logger.debug(message, data?)`

Logs a debug message to the console if `NODE_ENV` is **not** set to `production`.

#### Parameters:

- `message`: **string** - The debug message.
- `data` (optional): **unknown** - Additional debug info.

#### Example:

```ts
logger.debug('Fetching API data', { endpoint: '/users', method: 'GET' });
```

---

## Environment Variables

| Variable   | Description                                                          |
| ---------- | -------------------------------------------------------------------- |
| `NODE_ENV` | Set to `"production"` to disable logging in production environments. |

---

## Contributing

We welcome contributions! Please follow our commit guidelines and open issues if you encounter any problems.

---

[build-img]: https://github.com/Tincre/logger/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/Tincre/logger/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/@tincre/logger
[downloads-url]: https://www.npmtrends.com/@tincre/logger
[npm-img]: https://img.shields.io/npm/v/@tincre/logger
[npm-url]: https://www.npmjs.com/package/@tincre/logger
[issues-img]: https://img.shields.io/github/issues/Tincre/logger
[issues-url]: https://github.com/Tincre/logger/issues
[codecov-img]: https://codecov.io/gh/Tincre/logger/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/Tincre/logger
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
