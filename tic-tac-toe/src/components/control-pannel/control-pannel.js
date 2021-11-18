import React from 'react';
import classes from  './control-pannel.module.css';

const buttonsInfo = [
  {name: 'human', label: 'human'},
  {name: 'robot', label: 'robot'},
];

const GameModePannel = ({activeGameMode, onChangeMode}) => {
  const buttons = buttonsInfo.map(({name, label}) => {
    function clickHandler() {
      onChangeMode(name);
    }

    return (
      <button
        className={classes.Button += ((name === activeGameMode) ? ` ${classes.ActiveButton}` :  '')}
        key={name}
        onClick={clickHandler}
      >{label}</button>
    )     
  })

  return (
    <div className={classes.Panel}>
      {buttons}
    </div>
  )
}

const GameResetButton = ({onReset}) => {
  return (
    <button 
      className={classes.ResetButton}
      onClick={onReset}
    > 
      New game
    </button>
  )
}

function ControlPannel(props) {
  const {activeGameMode, onChangeMode, onResetGame} = props;

  return (
    <div className={classes.Panel}>
      <GameResetButton
        onReset = {onResetGame}
      />
      <GameModePannel
        activeGameMode = {activeGameMode}
        onChangeMode = {onChangeMode}
      />
    </div>
  )
}

export default ControlPannel;
