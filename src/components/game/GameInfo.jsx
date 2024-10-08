import React, { useState } from 'react';

function GameInfo({ history, currentMove, setCurrentMove, setHightLightList, locations }) {
    const [isAscendingSorted, setIsAscendingSorted] = useState(true);

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setHightLightList([]);
    }

    function generateHistoryDescription(moveId) {
        if(moveId === 0) {
            return 'Game start!';
        }        
        if(moveId === currentMove) {
            return `You are at move #${moveId}: ${locations[moveId]}`
        }
        return `Go to move #${moveId}: ${locations[moveId]}`;
    }

    return (
        <>
            <button onClick={() => setIsAscendingSorted(!isAscendingSorted)}>
                {isAscendingSorted === false ? "Change sort to ascending" : "Change sort to descending"}
            </button>

            <ol style={{
                display: 'flex', 
                flexDirection: (isAscendingSorted === false) ? 'column-reverse' : 'column'
            }}
            >
            {history.map((squares, move) => {
                const description = generateHistoryDescription(move);
                return <li key={move}>
                            {move === currentMove
                             ? <span>{description}</span>
                             : <button onClick={() => jumpTo(move)}>{description}</button>
                            }
                        </li>
                })
            }
            </ol>
        </>
    );
}

export default GameInfo;