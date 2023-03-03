const {
  createGame,
  getGameById,
  getAllVideoGames,
  searchVideoGameByName,
  deleteVgameRoute,
} = require("../controllers/vgamesController");

const getvgamesHandlers = async (req, res) => {
  const { name } = req.query;

  const results = name
    ? await searchVideoGameByName(name)
    : await getAllVideoGames();
  console.log(results);
  res.status(200).json(results);
};

const getvgameHandlers = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";
  try {
    const videogame = await getGameById(id, source);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createvgameHandlers = async (req, res) => {
  const { name, image, description, platforms, released_date, rating, genre } =
    req.body;
  try {
    const newGame = await createGame(
      name,
      image,
      description,
      platforms,
      released_date,
      rating,
      genre
    );
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getvgamesHandlers,
  getvgameHandlers,
  createvgameHandlers,
};
