import React from 'react';
import classes from './info-block.module.css';

const InfoBlock = ({info}) => {
  return (
    <div className={classes.Block}>
      {info}
    </div>
  )
}

export default InfoBlock;
