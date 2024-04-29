import Player from "./components/Player";
import Gameboard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

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



function App() {

  //const[activePlayer,setActivePlayer] = useState('X');
  const [gameTurns,setgameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameboard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
      const { square , player } = turn;
      const { row ,col } = square;

      gameboard[row][col] = player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameboard[combination[0].row] [combination[0].column];
    const secondSquare = gameboard[combination[1].row] [combination[1].column];
    const thirdSquare = gameboard[combination[2].row] [combination[2].column];

    if(firstSquare && 
      firstSquare === secondSquare && 
      firstSquare === thirdSquare
      )
    {
      winner = firstSquare;
    }

  } 

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'}/>
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'}/>
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
