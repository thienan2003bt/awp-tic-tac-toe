import React, { useState } from 'react';
import GameBoard from '../components/game/GameBoard';
import GameInfo from '../components/game/GameInfo';

function HomePage(props) {
    const [gameSize, setGameSize] = useState(3);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
	const [highLightList, setHightLightList] = useState([]);

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
                <GameBoard gameSize={gameSize} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} 
                    highLightList={highLightList} setHightLightList={setHightLightList}
                />
            </div>
            <div className="game-info">
                <GameInfo history={history} currentMove={currentMove} setCurrentMove={setCurrentMove} setHightLightList={setHightLightList}/>
            </div>
        </div>
    );
}


export default HomePage;