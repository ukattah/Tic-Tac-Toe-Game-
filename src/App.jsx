import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

// helper function to derive the gameboard
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  return gameBoard
}

// helper function to derive the winner
function deriveWinner(gameBoard, players) {

  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }

  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)

  const draw = gameTurns.length === 9 && !winner

  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]

      return updatedTurns
    })
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }


  return (
    <main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <Player onNameChange={handlePlayerNameChange} initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} />
          <Player onNameChange={handlePlayerNameChange} initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard board={gameBoard} onSelectSquare={handleSelectedSquare} />
      </div>

      <Log turns={gameTurns} />
    </main>
  )
}

export default App
