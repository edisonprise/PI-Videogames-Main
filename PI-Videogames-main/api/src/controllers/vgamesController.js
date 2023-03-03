const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

/***************************************** */
const createGame = async (
  name,
  image,
  description,
  platforms,
  released_date,
  rating,
  genre
) => {
  const gameCreated = await Videogame.findOrCreate({
    //devuelvo un array (OJOOO!!!!)
    where: {
      name,
      image,
      description,
      platforms,
      released_date,
      rating,
    },
  });

  await gameCreated[0].setGenres(genre);
  return true;
};

/********************************************* */
const getApiInfoById = async function (id) {
  try {
    const urlData = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const gamesData = {
      id: urlData.data.id,
      name: urlData.data.name,
      description: urlData.data.description_raw,
      image: urlData.data.background_image,
      released_date: urlData.data.released_date,
      rating: urlData.data.rating,
      platforms: urlData.data.platforms.map((p) => p.platform.name),
      genres: urlData.data.genres.map((g) => g.name),
    };
    console.log("error");
    return gamesData;
  } catch (error) {
    return null;
  }
};

const getDbInfoById = async function (id) {
  try {
    let dbInfo = await Videogame.findOne({
      where: {
        id: id,
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    dbInfo = JSON.parse(JSON.stringify(dbInfo));
    dbInfo.genres = dbInfo.Genres.map((g) => g);

    return dbInfo;
  } catch (error) {
    return error;
  }
};

const getGameById = async function (id) {
  if (isNaN(id)) {
    console.log("error2");
    const dbInfoById = await getDbInfoById(id);
    return dbInfoById;
  } else {
    console.log("error2");
    const apiInfoById = await getApiInfoById(id);
    return apiInfoById;
  }
};
/***************************************** */
const getApiInfo = async function () {
  let gamesData = [];

  for (let i = 1; i < 6; i++) {
    gamesData.push(
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
    );
  }

  return Promise.all(gamesData).then((response) => {
    let pages = [];
    let resultado = [];

    for (let i = 0; i < response.length; i++) {
      pages = [...pages, response[i].data.results];
    }

    pages.map((p) => {
      p.forEach((v) => {
        resultado.push({
          id: v.id,
          name: v.name,
          image: v.background_image,
          rating: v.rating.toFixed(2),
          genres: v.genres.map((g) => g.name),
          platforms: v.platforms.map((g) => g.platform.name),
          released_date: v.released_date,
        });
      });
    });

    return resultado;
  });
};

const getDbInfo = async function () {
  let dbInfo = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  dbInfo = JSON.parse(JSON.stringify(dbInfo));
  return dbInfo;
};

const getAllVideoGames = async function () {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = dbInfo.concat(apiInfo);
  return infoTotal;
};

/* *****************************************/

const getApiInfoByName = async function (name) {
  let gamesData = [];

  const urlData = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );

  urlData.data.results.forEach((v) => {
    if (gamesData.length < 15) {
      gamesData.push({
        id: v.id,
        name: v.name,
        description: v.description,
        image: v.background_image,
        released_date: v.released_date,
        rating: v.rating.toFixed(2),
        platforms: Array.isArray(v.platforms)
          ? v.platforms.map((p) => p.platform.name)
          : "Unspecified platform",
        genres: v.genres.map((g) => g.name),
      });
    }
  });
  gamesData = JSON.parse(JSON.stringify(gamesData));
  return gamesData;
};

const getDbInfoByName = async function (name) {
  let videoGames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: "%" + name + "%",
      },
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  videoGames = JSON.parse(JSON.stringify(videoGames));
  videoGames = videoGames.reverse();

  return videoGames.map((videoGame) => {
    videoGame.genres = videoGame.Genres.map((g) => g);
    return videoGame;
  });
};

const searchVideoGameByName = async function (name) {
  if (name) {
    const dbResults = await getDbInfoByName(name);
    const apiResults = await getApiInfoByName(name);
    const allResults = dbResults.concat(apiResults);
    return allResults.slice(0, 15);
  }
  return await getAllVideoGames().slice(0, 15);
};

/* ***************************** */
module.exports = {
  createGame,
  getGameById,
  getAllVideoGames,
  searchVideoGameByName,
};
