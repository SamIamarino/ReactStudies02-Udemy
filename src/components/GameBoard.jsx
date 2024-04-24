
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

    // const [gameBoard,setGameBoard] = useState(intialGameBoard);
    
    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map( innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectSquare(); 
    //         //The gameboard can accept a function as a props 
    // }       //and then can call and execute it.
    
    return(
        <ol id="game-board"> 
          {gameboard.map((row,rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) => (
                    <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                    </li>
                    ))}
                </ol>
            </li>
            ))}
        </ol>
    );
}