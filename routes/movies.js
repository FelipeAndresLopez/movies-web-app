import express from 'express';
import { MoviesService } from '../services/movies.js';

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
  router.get('/:movieId', async (request, response, next) => {
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

  router.post('/', async (request, response, next) => {
    try {
      const { body: movie } = request;
      const movieId = await moviesService.createMovie({ movie });
      response.status(200).json({
        data: movieId,
        message: 'movies created'
      })
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', async (request, response, next) => {
    try {
      const { movieId } = request.params;
      const { body: movie } = request;

      const updatedMovieId = await moviesService.updateMovie({ movieId, movie });
      response.status(200).json({
        data: updatedMovieId,
        message: 'movies updated'
      })
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', async (request, response, next) => {
    try {
      const { movieId } = request.params;

      const deletedMovieId = await moviesService.deleteMovie({ movieId });
      response.status(200).json({
        data: deletedMovieId,
        message: 'movies deleted'
      })
    } catch (error) {
      next(error);
    }
  });
}
