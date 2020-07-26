import React, { useState, useContext } from 'react';

import { toast, ToastContainer } from 'react-toastify';

import loginLogo from '../shared/UI/INPUT/Image/logo_sign2.svg';
import classes from '../shared/UI/INPUT/Input.module.css';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../shared/validation/validator';
import { useHistory } from 'react-router-dom';
import { useForm } from '../shared/Hooks/UseForm';
import { useHttpHook } from '../shared/Hooks/UseHttpHook';
import Button from '../shared/UI/Button/Button';
import Input from '../shared/UI/INPUT/Input';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const { isLoading, error, fetchData } = useHttpHook();
  const [showErrorNotification, setShowErorNotification] = useState(false);

  // we have to save the value and is Valid in the state so we save it in the useReducer but this can be used again so we made a custom hook. we have to send inputs and isValid to useForm. we need useForm to send these value to the server for this case for authentication
  const [state, InputHandler] = useForm(
    {
      Email: {
        value: '',
        isValid: false,
      },
      Password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setShowErorNotification((prevState) => !prevState);
    const email = state.inputs.Email.value;
    const password = state.inputs.Password.value;

    try {
      const res = await fetchData(
        'http://localhost:5000/api/v1/users/login',
        'POST',
        {
          email,
          password,
        },
        {
          'Content-Type': 'application/json',
        }
      );
      await toast.success('Login Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await login(res.data.user._id, res.data.token, res.data.user);
      setTimeout(() => {
        history.push('/blogs');
      }, 1000);
    } catch (error) {
      setShowErorNotification(false);
    }
  };
  return (
    <div className={classes.formPrimary}>
      <ToastContainer />
      {error &&
        showErrorNotification &&
        toast.error(error, { autoClose: false })}
      {/* formprimary is for background color and total height */}
      <div className={classes.formSecondary}>
        {/* formSecondary is to make image and form display flex */}
        <img src={loginLogo} alt='' />

        <form onSubmit={formSubmitHandler}>
          {/* // formheader for line after h2 and font size */}
          <h2 className={classes.formHeader}>Login</h2>
          <Input
            id='Email'
            label='EMAIL'
            placeholder='Enter Your Email'
            type='text'
            errorText='please enter a valid '
            elements='input'
            iconName='user'
            validators={[VALIDATOR_EMAIL()]}
            onInput={InputHandler}
          />

          {/* // icon name is whatever is left after fa */}
          <Input
            id='Password'
            label='PASSWORD'
            placeholder='Enter Your Password'
            type='password'
            errorText='At least 8 character '
            elements='input'
            iconName='lock'
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInput={InputHandler}
          />
          {/* // isLoading so that when the customer sends one request they have to wait cause the btn is disabled */}
          <Button btnType='login' disabled={!state.isValid || isLoading}>
            Login
          </Button>
          <hr style={{ marginTop: '40px' }} />
          {/* // link text is for display flex of link and text as well as font  */}
          <div className={classes.linkText}>
            <p>Dont have an account?</p>
            <Button to='/signup' btnType='link'>
              Signup
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
