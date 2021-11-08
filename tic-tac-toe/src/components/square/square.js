import React from 'react';
import './square.css';

function Square(props) {
    return (
      <div className="square" onClick={props.onClick}>
        {props.value}
      </div>
    );
}

export default Square;
