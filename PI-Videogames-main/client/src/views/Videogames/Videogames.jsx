import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";
import Videogame from "../Videogame/Videogame";
import Pagination from "../Pagination/Pagination";
import FilterBy from "../FilterBy/FilterBy";
import * as p from "./Videogames.module.css";
import { getAllGames, getGenres } from "../../redux/actions";
import notFound from "../../images/llorando.gif";
import loading from "../../images/conecting.gif";

function Videogames({ allGames, getAllGames, getGenres }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [cardPerPage] = useState(15);

  //* indices de la paginación:
  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;

  var currentCards; //"cards" que se deben mostrar en la pantalla

  // en caso de que al buscar un juego en particular no encuentra ninguno
  if (typeof allGames === "string") {
    currentCards = allGames;
  } else {
    currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard); //uso los indices para "fraccionar que juegos muestro"
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getAllGames();
    getGenres();
  }, [getAllGames, getGenres]);

  return (
    <div className={p.container}>
      <Navbar />
      <SearchBar />
      <FilterBy />
      <Pagination
        cardPerPage={cardPerPage}
        totalCards={allGames.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className={p.gamesdiv}>

        {currentCards.length > 1 ? (
          currentCards.map((g, i) => {
            return (
            <Videogame
              key={g.id}
              name={g.name}
              rating={g.rating}
              genres={g.genres}
              image={g.image}
              id={g.id}
              br={i}
            />
          )})
        ) : typeof currentCards === "string" ? (
          <div>
            <img className={p.nonono} src={notFound} alt=""></img>
          </div>
        ) : (
          <div>
            <img className={p.loading} src={loading} alt=""></img>
          </div>
        )}
      </div>
      <Pagination
        cardPerPage={cardPerPage}
        totalCards={allGames.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allGames: state.filtered,
  };
};

export default connect(mapStateToProps, { getAllGames, getGenres })(Videogames);
