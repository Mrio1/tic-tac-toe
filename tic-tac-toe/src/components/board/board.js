import React, {Component} from 'react';
import Square from '../square/square';
import classes from  './board.module.css';


function Board({squares, onClick}) {
  const squareComponents = squares.map((square, index) => {
    return (
      <Square
        value={squares[index]}
        onClick={() => {onClick(index)}}
        key={index}
      />
    )
  });   

  return (
    <div className={classes.Board}>
      {squareComponents}
    </div> 
  )
}

export default Board;
