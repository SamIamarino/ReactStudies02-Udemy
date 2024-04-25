export default function Gameboard({onSelectSquare,board,win}){
    
    return(
        <ol id="game-board"> 
          {board.map((row,rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) => (
                    <li key={colIndex}>
                        <button 
                            onClick={() => onSelectSquare(rowIndex,colIndex)} 
                            disabled={playerSymbol !== null || win !== null}
                            >   
                            {playerSymbol}
                        </button>
                    </li>
                    ))}
                </ol>
            </li>
            ))}
        </ol>
    );
}