import React from 'react';

function GameSquare({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
      );
}

export default GameSquare;