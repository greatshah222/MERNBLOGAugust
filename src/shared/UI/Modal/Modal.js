import React from 'react';
import classes from './Modal.module.css';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import BackDrop from '../../Backdrop/BackDrop';
// modalOverlay is used for just creating our portal which is later injected in the INDEX.HTML
const ModalOverlay = (props) => {
  // style is for any inline style
  const content = (
    <div className={classes.Modal} style={props.style}>
      <header className={classes.Modal__header}>
        <h2>{props.header}</h2>
      </header>
      <div className={classes.Modal__content}>{props.children}</div>
      <div className={classes.Modal__footer}>{props.footer}</div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};
function Modal(props) {
  return (
    <>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames={classes.Modal}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
}

export default Modal;
