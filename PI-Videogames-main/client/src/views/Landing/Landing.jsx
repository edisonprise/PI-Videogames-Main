import React from "react";
import { Link } from "react-router-dom";
import s from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={s.divLP}>
      <div className={s.divTextBtn}>
        <Link to="/videogames">
          <button className={s.myButton}>INSERT COIN</button>
        </Link>
      </div>
    </div>
  );
}
