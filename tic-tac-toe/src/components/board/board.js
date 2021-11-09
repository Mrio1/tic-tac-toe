import React, {Component} from 'react';
import Square from '../square/square';
import './board.css';

class Board extends Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => {this.props.onClick(i)}}
                key={i}
            />
        );
    }   
    render() {
        const outerClassName = this.props.outerClassName;
        const innerClassName = "board";
        const className = `${outerClassName} ${innerClassName}`;
        const squares = this.props.squares.map((square, index) => {
            return this.renderSquare(index);
        });
        return (
            <div className={className}>
                {squares}
            </div> 
        );
    }
}

export default Board;
