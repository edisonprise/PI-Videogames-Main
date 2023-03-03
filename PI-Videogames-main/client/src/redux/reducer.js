import {
  GET_ALL_GAMES,
  SEARCH_BY_NAME,
  GET_VIDEOGAME_DETAIL,
  GET_GENRES,
  ORDER_BY,
  FILTER_BY,
  
} from "../redux/constantes";

const initialState = {
  allGames: [],
  gamesBackUp: [],
  gameDetails: {},
  genres: [],
  filtered: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GAMES:
      action.payload.map((e) => {
        if (e.Genres) {
          let gen = e.Genres.map((f) => {
            return f.name;
          });
          Object.assign(e, { genres: gen });
        }
      });
      return {
        ...state,
        allGames: action.payload,
        gamesBackUp: action.payload,
        filtered: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        gameDetails: action.payload,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        gamesBackUp: action.payload,
        filtered: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        gamesBackUp: action.payload,
        genres: action.payload,
      };

    case FILTER_BY:
      if (action.payload === "default") {
        return { ...state, filtered: state.gamesBackUp };
      }

      if (action.payload === "DB") {
        return {
          ...state,
          filtered: state.gamesBackUp.filter(
            (game) => typeof game.id === "string"
          ),
        };
      }

      if (action.payload === "API") {
        return {
          ...state,
          filtered: state.gamesBackUp.filter(
            (game) => typeof game.id === "number"
          ),
        };
      } else {
        let arr = state.gamesBackUp.filter((e) => !isNaN(e.id));
        console.log(arr);
        return {
          ...state,
          filtered: arr.filter((game) => {
            return game.genres.find((genre) => {
              return genre === action.payload;
            });
          }),
        };
      }
    case ORDER_BY:
      if (action.payload === "A-Z") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.name > next.name) return 1;
            if (prev.name < next.name) return -1;
            return 0;
          }),
        };
      }

      if (action.payload === "Z-A") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.name > next.name) return -1;
            if (prev.name < next.name) return 1;
            return 0;
          }),
        };
      }

      if (action.payload === "desc") {
        return {
          ...state,
          filtered: [...state.filtered].sort(
            (prev, next) => prev.rating - next.rating
          ),
        };
      }

      if (action.payload === "asc") {
        return {
          ...state,
          filtered: [...state.filtered].sort(
            (prev, next) => next.rating - prev.rating
          ),
        };
      } else {
        return { ...state, filtered: state.gamesBackUp };
      }

    default:
      return { ...state };
  }
}
