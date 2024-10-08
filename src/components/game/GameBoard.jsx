import React, { useState } from 'react';
import GameSquare from './GameSquare';

function GameBoard({ gameSize, xIsNext, squares, onPlay }) {
	const [gameRow, setGameRow] = useState(Array(gameSize).fill(null));

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = 'X';
        } else {
          nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }
    

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }


    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    
    return (
        <>
            <div className="status">{status}</div>
			{gameRow.map((rowCount, rowId) => {
				return <div key={rowId} className="board-row">
					{gameRow.map((squareCount, squareId) => {
						const index = rowId * gameSize + squareId;
						return <GameSquare key={squareId} value={squares[index]} onSquareClick={() => handleClick(index)} />
					})
					}
            	</div>
			})}
        </>
      );
}

export default GameBoard;