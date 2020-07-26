import React from 'react';
import ReactDOM from 'react-dom';
import classes from './BackDrop.module.css';

function BackDrop(props) {
  return ReactDOM.createPortal(
    <div className={classes.BackDrop} onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
}

export default BackDrop;
