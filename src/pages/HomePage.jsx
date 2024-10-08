import React, { useState } from 'react';
import GameBoard from '../components/game/GameBoard';
import GameInfo from '../components/game/GameInfo';

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

    return (
        <div className="game">
            <div className="game-board">
                <GameBoard gameSize={gameSize} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <GameInfo history={history} setHistory={setHistory} currentMove={currentMove} setCurrentMove={setCurrentMove}/>
            </div>
        </div>
    );
}


export default HomePage;