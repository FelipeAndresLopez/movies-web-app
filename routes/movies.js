import express from 'express';
import { MoviesService } from '../services/movies.js';
import { movieIdSchema, createMovieSchema, updateMovieSchema } from '../utils/schemas/movies.js';
import { validationHandler } from '../utils/middleware/validationHandler.js';

export const moviesApi = (app) => {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  // Get all movies
  router.get('/', async (request, response, next) => {
    try {
      const { tags } = request.query;
      const movies = await moviesService.getMovies({ tags });
      response.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (error) {
      next(error);
    }
  });

  // Get movie by Id
  router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (request, response, next) => {
    try {
      const { movieId } = request.params;
      const movie = await moviesService.getMovie({ movieId });
      response.status(200).json({
        data: movie,
        message: 'movie retrieved'
      })
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validationHandler(createMovieSchema), async (request, response, next) => {
    try {
      const { body: movie } = request;
      const movieId = await moviesService.createMovie({ movie });
      response.status(200).json({
        data: movieId,
        message: 'movie created'
      })
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (request, response, next) => {
    try {
      const { movieId } = request.params;
      const { body: movie } = request;

      const updatedMovieId = await moviesService.updateMovie({ movieId, movie });
      response.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      })
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (request, response, next) => {
    try {
      const { movieId } = request.params;

      const deletedMovieId = await moviesService.deleteMovie({ movieId });
      response.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      })
    } catch (error) {
      next(error);
    }
  });
}
