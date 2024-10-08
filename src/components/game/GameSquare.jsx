import React, { useEffect, useState } from 'react';

function GameSquare({ index, value, onSquareClick, highlights }) {
    const [border, setBorder] = useState("");


    useEffect(() => {
        const newBorder = highlights.includes(index) === true ? "3px solid green" : "";
        setBorder(newBorder);
    }, [highlights])

    return (
        <button className="square" onClick={onSquareClick} style={{border: border}}>
            {value}
        </button>
      );
}

export default GameSquare;