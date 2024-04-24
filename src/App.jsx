import Player from "./components/Player";
import Gameboard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function App() {

  const[activePlayer,setActivePlayer] = useState('X');
  const [gameTurns,setgameTurns] = useState([]);

  function handleSelectSquare(rowIndex,colIndex){
    setActivePlayer( (currentlyActivePlayer) => currentlyActivePlayer === 'X' ? 'O' : 'X');
    setgameTurns(prevTurns => {
      let currentPlayer = 'X';

      if(prevTurns.length > 0 && prevTurns[0].player =='X'){
        currentPlayer = 'O';
      }

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
        <Gameboard 
        onSelectSquare={handleSelectSquare} 
        turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
