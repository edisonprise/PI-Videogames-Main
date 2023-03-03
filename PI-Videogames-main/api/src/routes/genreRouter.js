const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getGenreHandlers,
  getAllGenresHandler,
} = require("../handlers/genreHandlers");

const genreRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
genreRouter.get("/", getGenreHandlers);
genreRouter.get("/gen", getAllGenresHandler);

module.exports = genreRouter;
