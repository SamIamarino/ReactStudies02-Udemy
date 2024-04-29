import Player from "./components/Player";
import Gameboard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  Y: 'Player 2'
};

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player =='X'){
      currentPlayer = 'O';
    }
    return currentPlayer;
}

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function deriveWinner(gameboard,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameboard[combination[0].row] [combination[0].column];
    const secondSquare = gameboard[combination[1].row] [combination[1].column];
    const thirdSquare = gameboard[combination[2].row] [combination[2].column];

    if(firstSquare && 
      firstSquare === secondSquare && 
      firstSquare === thirdSquare)
    {
      winner = players[firstSquare];
    }
  } 
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameboard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
      const { square , player } = turn;
      const { row ,col } = square;

      gameboard[row][col] = player;
  }
  return gameboard;
}

function App() {

  const [players ,setPlayers] = useState({
    'X' : 'Player 1',
    'O' : 'Player 2',
  });
  
  const [gameTurns,setgameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameboard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameboard,players);
  const hasdraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex,colIndex){
    
    
    setgameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square : { row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  
  function handleRematch(){
    setgameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(previousPlayer => {
      return {
        ...previousPlayer, 
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          <Player initialName={PLAYERS.X}
          symbol='X'
          isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChange}
          />
          
          <Player initialName={PLAYERS.Y}
          symbol='O'
          isActive={activePlayer === 'O'}
          onChangeName={handlePlayerNameChange}
          />

        </ol>
        {(winner || hasdraw) && <GameOver winnerName={winner}  onRestart={handleRematch}/>}
        <Gameboard 
        onSelectSquare={handleSelectSquare} 
        board={gameboard} win={winner}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
