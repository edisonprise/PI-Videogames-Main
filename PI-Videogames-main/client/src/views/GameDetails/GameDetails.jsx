import { React, useEffect } from "react";
import { connect } from "react-redux";
import { getVideogameDetail } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import photo from "../../images/created.jpg";
import { NavLink } from "react-router-dom";
import "./GameDetails.module.css";

function GameDetails(props) {
  const { getVideogameDetail, gameDetails } = props;
  const { idVideogame } = props.match.params;
  let generos = gameDetails.genres;
  if (isNaN(idVideogame)) {
    generos = generos.map((e) => e.name);
  }

  // me carga los details del juego
  useEffect(() => {
    getVideogameDetail(idVideogame);
  }, [idVideogame]);

  return (
    <div className="container-detail">
      <Navbar />
      <div className="details-div">
        {gameDetails ? (
          <div>
            <h3 className="title">{gameDetails.name}</h3>
            {gameDetails.image ? (
              <div className="div-img">
                <img src={gameDetails.image} alt="Videogame"></img>
              </div>
            ) : (
              <div className="div-img">
                <img src={photo} alt="Videogame"></img>
              </div>
            )}
            {
              <p>
                <strong>Release Date</strong>:{" "}
                {`${gameDetails.releaseDate || "None"}`}
              </p>
            }
            <p>
              <strong>Rating</strong>: ★ {`${gameDetails.rating}`}
            </p>
            {gameDetails.description &&
            gameDetails.genres &&
            gameDetails.platforms ? (
              <div className="div-descr">
                {
                  <p className="descripcion">
                    {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                  </p>
                }
                {
                  <p>
                    <strong>Genres</strong>: {`${generos.join(", ")}`}
                  </p>
                }
                {
                  <p>
                    <strong>Platforms</strong>:{" "}
                    {`${
                      typeof gameDetails.platforms === "string"
                        ? gameDetails.platforms
                        : gameDetails.platforms.join(", ")
                    }`}
                  </p>
                }
                <NavLink to="/videogames">
                  <button>Volver</button>
                </NavLink>
              </div>
            ) : (
              <h1>Cargando</h1>
            )}
          </div>
        ) : (
          <h1>Cargando</h1>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    gameDetails: state.gameDetails,
  };
};

export default connect(mapStateToProps, { getVideogameDetail })(GameDetails);
