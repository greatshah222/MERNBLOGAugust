import React from 'react';
import classes from './Spinner.module.css';

function Spinner(props) {
  return (
    <div className={classes.loader} style={props.style}>
      {' '}
      Loading...
    </div>
  );
}

export default Spinner;
