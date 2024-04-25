import Player from "./components/Player";
import Gameboard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

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

let gameboard = initialGameBoard;

function App() {

  //const[activePlayer,setActivePlayer] = useState('X');
  const [gameTurns,setgameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  

  for(const turn of gameTurns){
      const { square , player } = turn;
      const { row ,col } = square;
      gameboard[row][col] = player;
  }

  let winner = null;

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
  
  
  function handleSelectSquare(rowIndex,colIndex){
    
    //setActivePlayer( (currentlyActivePlayer) => currentlyActivePlayer === 'X' ? 'O' : 'X');
    setgameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square : { row: rowIndex, col: colIndex}, player: activePlayer},
        ...prevTurns
      ];

      return updatedTurns;
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'}/>
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        {winner && <p>You won, {winner}!!</p>}
        <Gameboard 
        onSelectSquare={handleSelectSquare} 
        board={gameboard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
