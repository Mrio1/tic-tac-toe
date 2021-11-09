import React from 'react';
import './info-bar.css';

const GameInfo = ({moves, onJumpTo, outerClassName}) => {
    const innerClassName = "info-bar";
    const className = `${outerClassName} ${innerClassName}`
    const movesItem = moves.map((step, move) => {
            return (
                <li 
                    className={innerClassName + "__item"}
                    key={move}
                >
                    <button 
                        className={innerClassName + '__button'}
                        onClick={ ()=>{ onJumpTo(move) } }
                    >
                     {move} step
                    </button>
                </li>
                
            )
	    })
    return (
        <div className={className}>
            <ul className={innerClassName + '__list'}>
                {movesItem}
            </ul>
        </div>
    )
}

export default GameInfo;
