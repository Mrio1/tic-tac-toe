import React, {Component} from 'react';
import Board from '../board/board';
import ControlPannel from '../control-pannel/control-pannel';
import GameInfo from '../info-bar/info-bar';
import InfoBlock from '../info-block/info-block';
import checkTurn from '../../scripts/calculate-next-move';
import calculateWinner from '../../scripts/calculate-winner';
import {getGameData, updateGameData} from '../../scripts/storage-controller';
import {gameModes} from '../../libraries/library';
import classes from './game.module.css';

class Game extends Component {
    constructor(props) {
    super(props);
    this.isBlockGame = false;
    this.state = getGameData() || {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      activeGameMode: gameModes.vsPlayer,
    }
  }

	handleClick(squareIndex) {
    if (this.isBlockGame) {
      return
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[squareIndex]) {
     return;
    }
    squares[squareIndex] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  robotTurn() {
    const {history} = this.state;
    setTimeout(()=>{
      this.isBlockGame = false;
      const checkArr = history[history.length - 1].squares;
      const turn = checkTurn(checkArr, 'O', 'X');
      this.handleClick(turn);
    }, 500) 
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  onChangeMode(activeGameMode) {
    this.onResetGame();
    this.setState({
      activeGameMode
    })
  }

  onResetGame() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0
    })
  }

  render() {
    updateGameData(JSON.stringify(this.state));
    const {activeGameMode, xIsNext, history, stepNumber} = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `Win ${winner}`;
    } else {
      status = `Next turn: ${(xIsNext ? 'X' : 'O')}`;
      if (activeGameMode === gameModes.vsBot && !xIsNext) {
        this.isBlockGame = true;
        this.robotTurn();
      }
    }

    return (
      <div className={classes.Game}>
        <ControlPannel
            activeGameMode={activeGameMode}
            onChangeMode = {this.onChangeMode.bind(this)}
            onResetGame = {this.onResetGame.bind(this)}
          />
        <div className={classes.Main}>
          <GameInfo
            moves={history}
            onJumpTo={this.jumpTo.bind(this)}
          />
          <div className={classes.PlayField}>
            <InfoBlock
              info={status}
            />
            <Board
              squares={current.squares}
              onClick={this.handleClick.bind(this)} 
            />
          </div> 
        </div>
      </div>
    );
  }
}

export default Game;

