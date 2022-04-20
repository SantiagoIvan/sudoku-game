import "./styles.css";
import { useRef, useReducer } from "react";
import Game from "./components/Game";
import { dificulties } from "./utils/sudoku_algorithms";

const initialState = {
  username: "",
  dificulty: 0, //index del array de dificultades disponibles
  selectUsername: true,
  selectDificult: false,
  sudokuDimension: null,
  initialSudoku: null
};

function reducer(state, action) {
  switch (action.type) {
    case "username_chosen":
      if (!action.payload.username) return state;
      return {
        ...state,
        selectUsername: false,
        selectDificult: true,
        ...action.payload
      };
    case "dificulty_changed":
      return {
        ...state,
        dificulty: (state.dificulty + 1) % dificulties.length
      };
    case "game_started":
      const sudokuDimension = dificulties[state.dificulty][1];
      return {
        ...state,
        gameStarted: true,
        selectDificult: false,
        sudokuDimension
      };
    case "exit":
      return {
        ...state,
        gameStarted: false,
        sudokuDimension: null,
        selectUsername: true,
        initialSudoku: null
      }
    default:
      return state;
  }
}

export default function App() {
  const inputUsernameRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkUsername = () => {
    const value = inputUsernameRef.current.value;
    dispatch({
      type: "username_chosen",
      payload: {
        username: value
      }
    });
    if (!value) {
      inputUsernameRef.current.focus();
      inputUsernameRef.current.style.border = "2px solid red";
    }
  };

  const changeDificulty = () => {
    dispatch({
      type: "dificulty_changed"
    });
  };

  const start = () => {
    dispatch({
      type: "game_started"
    });
  };

  return (
    <>
      <h1>Sudoku</h1>

      <div className="container">
        {state.selectUsername && (
          <>
            <h4>Enter your name</h4>
            <input ref={inputUsernameRef} type="text" />
            <button className="main-btn" onClick={checkUsername}>
              Next!
            </button>
          </>
        )}
        {state.selectDificult && (
          <>
            <h4>Chose dificulty</h4>
            <button className="main-btn" onClick={changeDificulty}>
              {dificulties[state.dificulty].level}
            </button>
            <button className="main-btn" onClick={start}>
              Play!
            </button>
          </>
        )}
      </div>
      {state.gameStarted && (
        <Game state={state} dificulties={dificulties} dispatch={dispatch} />
      )}
    </>
  );
}
