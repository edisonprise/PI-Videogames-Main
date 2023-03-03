const { Genre } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;

/****************************************** */
const getAllGenres = async function () {
  //let gamesData = [];

  const urlData = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  let gamesData = urlData.data.results.map((v) => {
    return {
      //id: v.id,
      name: v.name,
    };
  });
  gamesData.forEach((el) => {
    Genre.findOrCreate({
      where: {
        //id: el.id,
        name: el.name,
      },
    });
  });
  return gamesData;
};

const getDbInfo = async function () {
  let dbInfo = await Genre.findAll();
  dbInfo = JSON.parse(JSON.stringify(dbInfo));
  return dbInfo;
};

module.exports = {
  getAllGenres,
  getDbInfo,
};
