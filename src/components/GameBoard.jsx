const intialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

export default function Gameboard({onSelectSquare,turns}){
    let gameboard = intialGameBoard;

    

    //Obj turns
    for(const turn of turns){
        const { square , player } = turn;
        const { row ,col } = square;
        gameboard[row][col] = player;
    }

    return(
        <ol id="game-board"> 
          {gameboard.map((row,rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) => (
                    <li key={colIndex}>
                        <button 
                            onClick={() => onSelectSquare(rowIndex,colIndex)} 
                            disabled={playerSymbol !== null}
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