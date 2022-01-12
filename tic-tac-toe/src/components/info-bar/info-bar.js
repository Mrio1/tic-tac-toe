import React from 'react';
import classes from './info-bar.module.css';

const GameInfo = ({moves, onJumpTo}) => {
  const movesItem = moves.map((step, move) => {
    function clickHandler() {
      onJumpTo(move)
    }

    return (
      <li key={move}>
        <button 
          className={classes.Button}
          onClick={clickHandler}
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
