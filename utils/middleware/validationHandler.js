import boom from "@hapi/boom";
import joi from '@hapi/joi';

function validate(data, schema) {
  const { error } = joi.object(schema).validate(data);
  return error;
}

export const validationHandler = (schema, check = 'body') => (request, response, next) => {
  const error = validate(request[check], schema);
  error ? next(boom.badRequest(error)) : next();
}