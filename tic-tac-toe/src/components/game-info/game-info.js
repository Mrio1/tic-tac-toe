import React from 'react';

const GameInfo = ({moves, onJumpTo}) => {
    const basicClassName = "game__info";
    const movesItem = moves.map((step, move) => {
            return (
                <li 
                    className={basicClassName + "__item"}
                    key={move}
                >
                    <button 
                        className={basicClassName + '__button'}
                        onClick={ ()=>{ onJumpTo(move) } }
                    >
                     {move} step
                    </button>
                </li>
                
            )
	    })
    return (
        <div className={basicClassName}>
            <ul className={basicClassName + '__list'}>
                {movesItem}
            </ul>
        </div>
    )
}

export default GameInfo;
