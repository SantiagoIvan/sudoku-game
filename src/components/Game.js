import { useState, useEffect } from "react";
import {checkSolution, solveSudoku, generateRandomSudoku, getDeepCopy} from '../utils/sudoku_algorithms'
import { utils, providers } from 'ethers'

const Game = ({ state, dispatch, dificulties }) => {
  const [ sudoku, setSudoku ] = useState(null)

  const check = () => {
    const aux=getDeepCopy(sudoku)
    if(checkSolution(aux)){
      alert("you won!")
      exit()
    }else{
      alert("not completed yet")
    }
  }

  const solve = async () => {
    try {
      const provider = new providers.Web3Provider(window.ethereum, 'any')
      if (!provider) {
        alert('Please install MetaMask!');
        return
      }
      if (window.ethereum && !window.ethereum.selectedAddress) { 
        const [_firstAccount] = await window.ethereum.request({
              method: "eth_requestAccounts"
          })
      }
      const acc = window.ethereum.selectedAddress
      const owner = process.env.REACT_APP_OWNER_WALLET
      const price = process.env.REACT_APP_SOLUTION_PRICE
      const signer = provider.getSigner()
      const tx = {
        from: acc,
        to: owner,
        value: utils.parseEther(price)
      }

      const execTx = await signer.sendTransaction(tx)
      await provider.waitForTransaction(execTx.hash)
      // aca podrias meter una logica para que se active un modal con un cosito girando tipo Loading
      alert("Transaction confirmed! Here is your solution")

      const aux=getDeepCopy(sudoku)
      const result = solveSudoku(aux)
      setSudoku(result)
    } catch (error) {
      console.log("Error solving sudoku", {error}) 
    }
  }

  const exit = () => {
    dispatch({type: "exit"})
  }


  const onInputChange = (e, x, y) => {
    const n = parseInt(e.target.value) || 0, aux=getDeepCopy(sudoku)
    
    aux[x][y] = n > 0 && n<=state.sudokuDimension ? n : 0
    setSudoku(aux)
  }

  useEffect( () => {
    const aux = generateRandomSudoku(state.dificulty)
    setSudoku(aux)
  }, [])

  return (
    <div className="game">
      <div className="container-info">
        <h5>Username: {state.username}</h5>
        <h5>Dificulty: {dificulties[state.dificulty][0]}</h5>
        <h5>
          Size: {state.sudokuDimension}x{state.sudokuDimension}
        </h5>
      </div>

      <div className="board">
        {
          sudoku &&
          <table>
            <tbody>
              {sudoku.map( (row, rowIndex) => 
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
