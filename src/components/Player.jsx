import { useState } from "react";

export default function Player({name,symbol}){
    const [isEditing,setIsEditing] = useState(false);

    var playerName = <span className="player-name">{name}</span>; 

    function handleClick(){
        setIsEditing(true);
    }

    if(isEditing) {
        playerName = <input type="text" required/>
    }

    return(
        <li>
          <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleClick}>Edit</button>
          </li>
    );
}