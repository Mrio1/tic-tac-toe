import React, {Component} from 'react';
import Board from '../board/board';
import ControlPannel from '../control-pannel/control-pannel';
import GameInfo from '../info-bar/info-bar';
import InfoBlock from '../info-block/info-block';
import checkTurn from '../../scripts/calculate-next-move';
import calculateWinner from '../../scripts/calculate-winner';
import {getGameData, updateGameData} from '../../scripts/storage-controller';
import './game.css';

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
      activeGameMode: 'human',
		}
    console.log(getGameData())
	}

	handleClick(i) {
    if (this.isBlockGame) {return}
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
				return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
				history: history.concat([{
					squares: squares,
				}]),
				stepNumber: history.length,
				xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

  onChangeMode(mode) {
    this.setState({
      activeGameMode: mode
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
			status = 'Win ' + winner;
		}
		else {
			status = 'Next turn: '+ (xIsNext ? 'X' : 'O');
      if (activeGameMode ==='robot' && !xIsNext) {
        this.isBlockGame = true;
        setTimeout(()=>{
          this.isBlockGame = false;
          const checkArr = history[history.length - 1].squares;
          const turn = checkTurn(checkArr, 'O', 'X');
          this.handleClick(turn)
        }, 500) 
      }
		}

    return (
      <div className="game">
        <ControlPannel
            outerClassName="game__control-panel"
            activeGameMode={activeGameMode}
            onChangeMode = {this.onChangeMode.bind(this)}
            onResetGame = {this.onResetGame.bind(this)}
          />
        <div className="game__main">
          <GameInfo
            outerClassName="game__side-bar"
            moves={history}
            onJumpTo={this.jumpTo.bind(this)}
          />
          <div className="game__play-field">
            <InfoBlock
              outerClassName="game__info"
              info={status}
            />
            <Board
              outerClassName="game__board"
              squares={current.squares}
              onClick={(i)=> this.handleClick(i)} 
            />
          </div>
          
        </div>
      </div>
    );
  }
}

export default Game;
