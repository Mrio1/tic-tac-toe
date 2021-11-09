import React, {Component} from 'react';
import './control-pannel.css';

const GameModePannel = ({activeGameMode, onChangeMode, outerClassName}) => {
    const innerClassName = 'mode-panel';
    const className = `${outerClassName} ${innerClassName}`
    const buttonsInfo = [
        {name: 'human', label: 'human'},
        {name: 'robot', label: 'robot'},
    ];

    const buttons = buttonsInfo.map(({name, label}) => {
            let btnClassName = `${innerClassName}__button`;
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
        <div className={className}>
            {buttons}
        </div>
    )
}

const GameResetButton = ({onReset, outerClassName}) => {
    const innerClassName = 'reset-button';
    const className = `${outerClassName} ${innerClassName}`
    return (
        <button 
            className={className}
            onClick={()=> {
                onReset();
            }}
        > New game</button>
    )
}

class ControlPannel extends Component {
    render() {
        const {activeGameMode, onChangeMode, onResetGame, outerClassName} = this.props;
        const innerClass = 'control-panel';
        const className = `${outerClassName} ${innerClass}`
        return (
            <div className={className}>
                <GameResetButton
                    outerClassName={innerClass+'__reset-button'}
                    onReset = {onResetGame}
                />
                <GameModePannel
                    outerClassName = {innerClass+'__mode-panel'}
                    activeGameMode = {activeGameMode}
                    onChangeMode = {onChangeMode}
                />
            </div>
        )
    }
}

export default ControlPannel;
