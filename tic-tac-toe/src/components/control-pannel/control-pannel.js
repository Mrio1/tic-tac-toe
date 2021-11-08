import React, {Component} from 'react';
import './control-pannel.css';

const GameModePannel = ({activeGameMode, onChangeMode}) => {
    let basicClassName = 'game-mode'
    const buttonsInfo = [
        {name: 'human', label: 'human'},
        {name: 'robot', label: 'robot'},
    ];

    const buttons = buttonsInfo.map(({name, label}) => {
            let btnClassName = `${basicClassName}__button`;
            const isActive = (name === activeGameMode);
            btnClassName += (isActive) ? ` ${btnClassName}_active` : '';
            return (
                <button
                    className={btnClassName}
                    key={name}
                    onClick={()=>{
                        onChangeMode(name)
                    }}
                >{label}</button>
            )     
        }  
    )
    return (
        <div className={basicClassName}>
            {buttons}
        </div>
    )
}

const GameResetButton = ({onReset}) => {
    return (
        <button 
            className="reset-button"
            onClick={()=> {
                onReset();
            }}
        > New game</button>
    )
}

class ControlPannel extends Component {
    render() {
        const {activeGameMode, onChangeMode, onResetGame} = this.props;
        return (
            <div className="control-panel">
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
}

export default ControlPannel;
