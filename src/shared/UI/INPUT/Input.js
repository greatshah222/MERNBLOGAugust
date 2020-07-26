import React, { useReducer, useEffect } from 'react';
import classes from './Input.module.css';
import { inputReducer } from './Reducer/InputReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Input(props) {
  const initialState = {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouched: false,
  };

  const [state, dispatch] = useReducer(inputReducer, initialState);

  const { value, isTouched, isValid } = state;
  const { onInput, id, validators } = props;
  // we are calling onInput cause we have to send allthis data to useForm and their value are stored as state in the login component (example)
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, isValid, onInput, value]);
  // when the input is changed we have to send the value to the useform for validity check
  // console.log(state);
  const changeHandler = (e) => {
    dispatch({
      type: 'ONINPUTCHANGE',
      value: e.target.value,
      validators: validators,
    });
  };

  // touched
  const touchedHandler = () => {
    dispatch({
      type: 'TOUCHED',
    });
  };

  const content =
    props.elements === 'input' ? (
      <div
        className={`${classes.formInput} ${
          !isValid && isTouched && classes.formInputInvalid
        } `}
      >
        <FontAwesomeIcon icon={props.iconName} className={classes.iconColor} />
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchedHandler}
          value={value}
        />
      </div>
    ) : (
      <div
        className={`${classes.formInput} ${
          !isValid && isTouched && classes.formInputInvalid
        } `}
      >
        <FontAwesomeIcon icon={props.iconName} className={classes.iconColor} />
        <textarea
          id={props.id}
          onChange={changeHandler}
          onBlur={touchedHandler}
          value={value}
          rows={props.rows || 3}
          placeholder={props.placeholder}
        />
      </div>
    );
  return (
    <>
      {content}
      {!isValid && isTouched && (
        <p
          style={{
            marginTop: '-25px',
            marginBottom: '10px',
            textAlign: 'center',
            padding: '3px',
            color: 'red',
            fontSize: '80%',
          }}
        >
          {props.errorText}
          {props.label}
        </p>
      )}
    </>
  );
}

export default Input;
