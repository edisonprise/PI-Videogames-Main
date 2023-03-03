const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getvgamesHandlers,
  getvgameHandlers,
  createvgameHandlers,
  deletevgameHandlers,
} = require("../handlers/vgamesHandlers");

const videogameRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const validate = (req, res, next) => {
  const { name, image, description, platforms, released_date, rating, genre } =
    req.body;
  if (
    !name ||
    !image ||
    !description ||
    !platforms ||
    !released_date ||
    !rating ||
    !genre
  )
    return res.status(400).json({ error: "Missing data" });

  next();
};

videogameRouter.get("/", getvgamesHandlers);

videogameRouter.get("/:id", getvgameHandlers);

videogameRouter.post("/", validate, createvgameHandlers);

module.exports = videogameRouter;
