import { moviesMock } from '../utils/mocks/movies.js';

export class MoviesService {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  }

  async createMovie() {
    const movieId = await Promise.resolve(moviesMock[0].id);
    return movieId;
  }

  async updateMovie() {
    const movieId = await Promise.resolve(moviesMock[0].id);
    return movieId;
  }

  async deleteMovie() {
    const movieId = await Promise.resolve(moviesMock[0].id);
    return movieId;
  }
}