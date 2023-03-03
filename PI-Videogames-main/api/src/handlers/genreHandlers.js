const { getAllGenres, getDbInfo } = require("../controllers/genresController");
const getAllGenresHandler = async (req, res) => {
  const { id, name } = req.params;
  try {
    const genre = await getDbInfo({ id, name });
    res.status(200).json(genre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getGenreHandlers = async (req, res) => {
  const { name } = req.params;

  try {
    const genre = await getAllGenres(name);
    res.status(200).json(genre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getGenreHandlers, getAllGenresHandler };
