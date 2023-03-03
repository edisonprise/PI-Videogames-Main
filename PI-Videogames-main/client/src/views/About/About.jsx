import React from "react";
import NavBar from "../Navbar/Navbar";
import imagen from "../../images/videogame.png";
import "./About.module.css";

function About() {
  return (
    <>
      <NavBar />
      <div className="container-about">
        <h1>Individual Project</h1>
        <h1>Edinson Cespedes</h1>
        <div className="div-foto">
          <img src={imagen} alt="foto"></img>
        </div>
      </div>
    </>
  );
}

export default About;
