import express from 'express';

import { config } from './config/index.js';
import { moviesApi } from './routes/movies.js'
import { errorHandler, logErrors, wrapErrors } from './utils/middleware/errorHandlers.js';
import { notFoundHanlder } from './utils/middleware/notFoundHandler.js';

const app = express();



// Body parser middleware
app.use(express.json());

// Routes
moviesApi(app);

// Catch 404 error
app.use(notFoundHanlder);

// Error handler middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`listening http://localhost:${config.port}`)
});