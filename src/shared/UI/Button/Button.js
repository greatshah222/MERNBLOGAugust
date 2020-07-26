import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Button.module.css';

function Button({
  btnType,
  to,
  exact,
  children,
  disabled,
  type,
  onClick,
  style,
}) {
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`${classes.Button} ${classes[btnType]}`}
        style={style}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes.Button} ${classes[btnType]}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
