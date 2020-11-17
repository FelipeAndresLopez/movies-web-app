import { config } from '../../config/index.js';
import boom from '@hapi/boom';

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;

}

export function logErrors(error, request, response, next) {
  console.log(error);
  next(error);
}

export function wrapErrors(error, request, response, next) {
  if (!error.isBoom) {
    next(boom.badImplementation(error));
  }

  next(error);
}

export function errorHandler(error, request, response, next) {  // eslint-disable-line
  console.log(error)
  const { output: { statusCode, payload } } = error;
  response.status(statusCode);
  response.json(withErrorStack(payload, error.stack));
}