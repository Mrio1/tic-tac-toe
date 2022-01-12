import React, {Component} from 'react';
import Board from '../board/board';
import ControlPannel from '../control-pannel/control-pannel';
import GameInfo from '../info-bar/info-bar';
import InfoBlock from '../info-block/info-block';
import checkTurn from '../../scripts/calculate-next-move';
import calculateWinner from '../../scripts/calculate-winner';
import {getGameData, updateGameData} from '../../scripts/storage-controller';
import {GAME_MODES, PLAYER_SYMBOLS, GAME_STATUS} from '../../libraries/library';
import classes from './game.module.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.isNextTurnBlocked = false;
    this.state = getGameData() || {
      history: this.initHistory(),
      stepNumber: 0,
      isFirstPlayerTurn: true,
      activeGameMode: GAME_MODES.vsPlayer,
    }
    this.boardClickHandler = this.handleClick.bind(this);
    this.changeModeHandler = this.onChangeMode.bind(this);
    this.resetGameHanddler = this.onResetGame.bind(this);
  }

  initHistory() {

    return [{squares: Array(9).fill(null)}]
  }

	handleClick(squareIndex) {
    if (this.isNextTurnBlocked) {
      return
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[squareIndex]) {
     return;
    }
    squares[squareIndex] = this.state.isFirstPlayerTurn ? PLAYER_SYMBOLS.FIRST : PLAYER_SYMBOLS.SECOND;
    this.setState({
      history: history.concat([{
        squares
      }]),
      stepNumber: history.length,
      isFirstPlayerTurn: !this.state.isFirstPlayerTurn,
    });
  }

  robotTurn() {
    const {history} = this.state;
    setTimeout(()=>{
      this.isNextTurnBlocked = false;
      const checkArr = history[history.length - 1].squares;
      const turn = checkTurn(checkArr, PLAYER_SYMBOLS.SECOND, PLAYER_SYMBOLS.FIRST);
      this.handleClick(turn);
    }, 500) 
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isFirstPlayerTurn: (step % 2) === 0,
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
      history: this.initHistory(),
      stepNumber: 0
    })
  }

  render() {
    updateGameData(JSON.stringify(this.state));
    const {activeGameMode, isFirstPlayerTurn, history, stepNumber} = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const status = (winner)
      ? `${GAME_STATUS.WIN} ${winner}`
      : `${GAME_STATUS.NEXT}: ${(isFirstPlayerTurn ? PLAYER_SYMBOLS.FIRST : PLAYER_SYMBOLS.SECOND)}`;
    if (!winner && activeGameMode === GAME_MODES.vsBot && !isFirstPlayerTurn) {
      this.isNextTurnBlocked = true;
      this.robotTurn();
    }

    return (
      <div className={classes.Game}>
        <ControlPannel
          activeGameMode={activeGameMode}
          onChangeMode={this.changeModeHandler}
          onResetGame={this.resetGameHanddler}
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
              onClick={this.boardClickHandler} 
            />
          </div> 
        </div>
      </div>
    );
  }
}

export default Game;

