import React, {Component} from 'react';
import Board from '../board/board';
import ControlPannel from '../control-pannel/control-pannel';
import GameInfo from '../info-bar/info-bar';
import checkTurn from '../../scripts/calculate-next-move';
import InfoBlock from '../info-block/info-block'; 

class Game extends Component {
    constructor(props) {
		super(props);
    this.isBlockGame = false;
		this.state = {
			history: [
				{
					squares: Array(9).fill(null),
				}
			],
			stepNumber: 0,
			xIsNext: true,
      firsPlayerIsNext: true,
      activeGameMode: 'human',
		}
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
        firsPlayerIsNext: !this.state.firsPlayerIsNext,
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
    const {activeGameMode, firsPlayerIsNext, xIsNext, history, stepNumber} = this.state;
		const current = history[stepNumber];
		const winner = calculateWinner(current.squares);
		let status;
		if (winner) {
			status = 'Win ' + winner;
		}
		else {
			status = 'Next turn: '+ (xIsNext ? 'X' : 'O');
      if (activeGameMode ==='robot' && !firsPlayerIsNext) {
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

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

export default Game;
