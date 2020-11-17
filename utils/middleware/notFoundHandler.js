import boom from "@hapi/boom";


export function notFoundHanlder(request, response) {
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  response.status(statusCode).json(payload)
}