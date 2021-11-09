import React from 'react';
import './info-block.css';

const InfoBlock = ({info, outerClassName}) => {
    const innerClassName = 'info-block';
    const className = `${outerClassName} ${innerClassName}`
    return (
        <div className={className}>
            {info}
        </div>
    )
}

export default InfoBlock;
