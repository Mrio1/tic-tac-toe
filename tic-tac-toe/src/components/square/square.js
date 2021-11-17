import React from 'react';
import classes from './square.module.css';

function Square({ value, onClick}) {
  return (
    <div className={classes.Square} onClick={onClick}>
      {value}
    </div>
  );
}

export default Square;
