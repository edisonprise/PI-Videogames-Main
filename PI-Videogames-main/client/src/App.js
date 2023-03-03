import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./views/About/About";
import CrearJuego from "./views/CrearVideogame/CrearVideogame";
import GameDetails from "./views/GameDetails/GameDetails";
import Landing from "./views/Landing/Landing";
import Page404 from "./views/Page_404/Page_404";
import Videogames from "./views/Videogames/Videogames";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/videogames" component={Videogames} />
        <Route exact path="/crearjuego" component={CrearJuego} />
        <Route exact path="/videogame/:idVideogame" component={GameDetails} />
        <Route exact path="/about" component={About} />
        <Route path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
