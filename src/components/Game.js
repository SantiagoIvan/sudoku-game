const Game = ({ state, dispatch, dificulties }) => {
  return (
    <div className="game">
      <div className="game-info">
        <h5>Username: {state.username}</h5>
        <h5>Dificulty: {dificulties[state.dificulty][0]}</h5>
        <h5>
          Size: {state.boardDimension}x{state.boardDimension}
        </h5>
        <button className="reset-btn">Reset</button>
      </div>
      <div>Sudoku here, dsp borrar este div </div>

      <div className="board">{console.log(state.board)}</div>
      <div>
        <button>Solution</button>
        <button>Exit</button>
      </div>
    </div>
  );
};

export default Game;
