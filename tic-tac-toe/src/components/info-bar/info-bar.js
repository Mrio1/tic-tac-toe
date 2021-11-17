import React from 'react';
import classes from './info-bar.module.css';

const GameInfo = ({moves, onJumpTo, outerClassName}) => {
  const movesItem = moves.map((step, move) => {
    return (
      <li key={move}>
        <button 
          className={classes.Button}
          onClick={ ()=>{ onJumpTo(move) } }
        >
         {move} step
        </button>
      </li>            
    )
	})
  
  return (
    <div className={classes.Bar}>
      <ul className={classes.List}>
        {movesItem}
      </ul>
    </div>
  )
}

export default GameInfo;
