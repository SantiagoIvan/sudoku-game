import { useState, useEffect } from "react";
import {checkSolution, solveSudoku, generateRandomSudoku, getDeepCopy} from '../utils/sudoku_algorithms'

const Game = ({ state, dispatch, dificulties }) => {
  const [ board, setBoard ] = useState(null)

  const check = () => {
    const aux=getDeepCopy(board)
    if(checkSolution(aux)){
      alert("you won!")
      exit()
    }else{
      alert("not completed yet")
    }
  }

  const solve = () => {
    const aux=getDeepCopy(board)
    const result = solveSudoku(aux)
    setBoard(result)
  }

  const exit = () => {
    dispatch({type: "exit"})
  }


  const onInputChange = (e, x, y) => {
    const n = parseInt(e.target.value) || 0, aux=getDeepCopy(board)
    
    aux[x][y] = n > 0 && n<=state.boardDimension ? n : 0
    setBoard(aux)
  }

  useEffect( () => {
    const aux = generateRandomSudoku(state.dificulty)
    setBoard(aux)
  }, [])

  return (
    <div className="game">
      <div className="container-info">
        <h5>Username: {state.username}</h5>
        <h5>Dificulty: {dificulties[state.dificulty][0]}</h5>
        <h5>
          Size: {state.boardDimension}x{state.boardDimension}
        </h5>
      </div>

      <div className="board">
        {
          board &&
          <table>
            <tbody>
              {board.map( (row, rowIndex) => 
              <tr key={rowIndex}>
                {row.map((square, colIndex) => 
                <td key={rowIndex+colIndex}>
                  <input
                    onChange={e => onInputChange(e, rowIndex, colIndex)} value={square}/>
                </td>
                )}
              </tr>
              )}
            </tbody>
          </table>
        }
      </div>

      <div className="container-info">
        <button onClick={check}>Check</button>
        <button onClick={solve}>Solve it, I'm stupid</button>
        <button onClick={exit}>Exit</button>
      </div>
    </div>
  );
};

export default Game
