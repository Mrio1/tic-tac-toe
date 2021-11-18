import React from 'react';

const GameInfo = ({moves, onJumpTo}) => {
  const movesItem = moves.map((step, move) => {
    function clickHandler() {
      onJumpTo(move)
    }

    return (
      <li 
        key={move}
      >
        <button 
          onClick={clickHandler}
        >
          {move} step
        </button>
      </li> 
    )
	})

  return (
    <div>
      <ul>
        {movesItem}
      </ul>
    </div>
  )
}

export default GameInfo;
