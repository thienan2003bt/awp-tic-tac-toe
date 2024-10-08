import React, { useEffect, useState } from 'react';
import GameSquare from './GameSquare';

function GameBoard({ gameSize, xIsNext, squares, onPlay, highLightList, setHightLightList, setLocations }) {
	const [gameRow, setGameRow] = useState(Array(gameSize).fill(null));
	const [winner, setWinner] = useState(null);

    function handleClick(i) {
		setHightLightList([]);
		setLocations(prev => [...prev, `(${parseInt(i / 3)}, ${i % 3})`])

		if(winner || squares[i]) {
			return;
		}

        const nextSquares = squares.slice();
		nextSquares[i] = xIsNext === true ? 'X' : 'O';
        onPlay(nextSquares);
    }

	function displayWinner() {
		return winner === "DRAW" ? "GAME DRAW" : "Winner: " + winner;
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
				setHightLightList(lines[i])
				return squares[a];
          	}
        }

		const checkingDrawSquares = squares.filter(s => s !== 'X' && s !== 'O');
		if(checkingDrawSquares.length <= 0) {
			return "DRAW";
		}
        return null;
    }

	useEffect(() => {
		
		const newWinner = calculateWinner(squares);
		setWinner(newWinner)
	}, [squares])
   
    return (
        <>
			{winner
				? <div className="status" style={{color: "green", fontWeight: "bold"}}>{displayWinner()}</div> 
			   : <div className="status">{"Next player: " + (xIsNext ? 'X' : 'O')}</div>
			}

			{gameRow.map((rowCount, rowId) => {
				return <div key={rowId} className="board-row">
					{gameRow.map((squareCount, squareId) => {
						const index = rowId * gameSize + squareId;
						return <GameSquare key={squareId} index={index}
							value={squares[index]} onSquareClick={() => handleClick(index)} 
							highlights={highLightList}
						/>
					})
					}
            	</div>
			})}
        </>
      );
}

export default GameBoard;