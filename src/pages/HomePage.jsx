import React, { useState } from 'react';
import GameBoard from '../components/game/GameBoard';

function HomePage(props) {
    const [gameSize, setGameSize] = useState(3);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function generateHistoryDescription(moveId) {
        if(moveId === 0) {
            return 'Game start!';
        } else if(moveId === currentMove) {
            return `You are at move #${moveId}`
        }
        return `Go to move #${moveId}`;
    }

    return (
        <div className="game">
            <div className="game-board">
                <GameBoard gameSize={gameSize} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>
                {history.map((squares, move) => {
                    const description = generateHistoryDescription(move);
                    return (
                        <li key={move}>
                            {move === currentMove
                            ? <span>{description}</span>
                            : <button onClick={() => jumpTo(move)}>{description}</button>
                            }
                        </li>
                    );
                    })
                }
                </ol>
            </div>
        </div>
    );
}


export default HomePage;