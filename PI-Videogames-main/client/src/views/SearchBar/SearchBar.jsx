import { React, useState } from "react";
import { connect } from "react-redux";
import { searchByName, getAllGames } from "../../redux/actions";
import * as p from "./SearchBar.module.css";

function SearchBar({ searchByName, getAllGames }) {
  const [input, setInput] = useState({
    buscar: "",
  });

  const handleInputChange = function (e) {
    setInput({
      [e.target.name]: e.target.value,
    });
  };

  const handleOnClick = () => {
    searchByName(input.buscar);
    setInput({
      buscar: "",
    });
  };

  const handleOnClickAll = () => {
    getAllGames();
    setInput({
      buscar: "",
    });
  };

  return (
    <div className={p.searchbardiv}>
      <input
        className={p.barbtn}
        name="buscar"
        placeholder="busca tu juego..."
        onChange={handleInputChange}
        value={input.buscar}
        autoComplete="off"
      ></input>
      <button className={p.btn} onClick={handleOnClick}>
        Buscar
      </button>
      <button className={p.btn} onClick={handleOnClickAll}>
        CargarTodos
      </button>
    </div>
  );
}

export default connect(null, { searchByName, getAllGames })(SearchBar);
