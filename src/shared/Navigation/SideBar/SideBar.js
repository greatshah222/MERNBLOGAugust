import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import classes from './SideBar.module.css';

function SideBar(props) {
  // this is only visible when props.show is true and it is classNames bot just className.The class is given for the animation
  const content = (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames={classes.SlideInLeft}
      mountOnEnter
      unmountOnExit
    >
      <aside className={classes.SideBar}>{props.children}</aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('sideDrawer-Hook')
  );
}

export default SideBar;
