import React from "react";
import * as p from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className={p.navbardiv}>
      <NavLink to="/">
        <button>Intro</button>
      </NavLink>
      <NavLink to="/videogames">
        <button>Videogames</button>
      </NavLink>
      <NavLink to="/crearjuego">
        <button>CrearJuego</button>
      </NavLink>
      <NavLink to="/about">
        <button>About</button>
      </NavLink>
    </div>
  );
}

export default NavBar;
