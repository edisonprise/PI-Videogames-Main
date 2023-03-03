import React from "react";
import { Link } from "react-router-dom";
import * as p from "./Videogame.module.css";
import photo from "../../images/created.jpg";

export default function Videogame(props) {
  return (
    <div className={p.containergame}>
      <Link to={`/videogame/${props.id}`}>
        <div className={p.gamediv}>
          {props.image ? (
            <img src={props.image} alt="Videogame" className={p.Img}></img>
          ) : (
            <img src={photo} alt="Videogame" className={p.Img}></img>
          )}
        </div>
        <div className={p.as}>
          <div className={p.titlegame}>{props.name}</div>
          <div className={p.infoRating}></div>
          <hr />
          <div className={p.infoContGenres}>
            {
              <div className="">
                {" "}
                {`${
                  typeof props.genres === "string" ? props.genres : props.genres
                }`}
              </div>
            }
          </div>
        </div>
      </Link>
    </div>
  );
}
