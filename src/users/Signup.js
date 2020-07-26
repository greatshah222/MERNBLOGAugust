import React, { useContext } from 'react';
import Input from '../shared/UI/INPUT/Input';

import loginLogo from '../shared/UI/INPUT/Image/logo_sign2.svg';
import classes from '../shared/UI/INPUT/Input.module.css';
import Button from '../shared/UI/Button/Button';
import { useForm } from '../shared/Hooks/UseForm';
import { useHttpHook } from '../shared/Hooks/UseHttpHook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_FILE,
} from '../shared/validation/validator';
import { AuthContext } from '../context/AuthContext';
import ImageUpload from '../shared/UI/ImageUpload/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../shared/UI/Spinner/Spinner';
function Signup() {
  const { isLoading, fetchData } = useHttpHook();

  const { login } = useContext(AuthContext);

  const [state, InputHandler] = useForm({
    Name: {
      value: '',
      isValid: false,
    },
    Email: {
      value: '',
      isValid: false,
    },
    Password: {
      value: '',
      isValid: false,
    },
    PasswordConfirm: {
      value: '',
      isValid: false,
    },
    Image: {
      value: '',
      isValid: true,
    },
  });
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const { Email, PasswordConfirm, Password, Name, Image } = state.inputs;
    try {
      const formData = new FormData();
      formData.append('name', Name.value);
      formData.append('email', Email.value);
      formData.append('password', Password.value);
      formData.append('passwordConfirm', PasswordConfirm.value);
      formData.append('image', Image.value);
      // custom hook
      const res = await fetchData(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/signup`,
        'POST',
        formData,
        {
          'Content-Type': 'multipart/form-data',
        }
      );
      console.log(res);

      await login(res.data.user._id, res.data.token, res.data.user);
      toast.success('Welcome to this Forum');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className={classes.formPrimary}>
        <div className={classes.formSecondary}>
          <img src={loginLogo} alt='' />
          {isLoading ? (
            <Spinner />
          ) : (
            <form onSubmit={formSubmitHandler}>
              <h2 className={classes.formHeader}>Signup</h2>
              <Input
                id='Name'
                label='Name'
                placeholder='Enter Your Name'
                type='text'
                errorText='please enter a valid '
                elements='input'
                iconName='user'
                onInput={InputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
              <Input
                id='Email'
                label='EMAIL'
                placeholder='Enter Your Email'
                type='text'
                errorText='please enter a valid '
                elements='input'
                iconName='envelope'
                onInput={InputHandler}
                validators={[VALIDATOR_EMAIL()]}
              />
              <ImageUpload
                id='Image'
                iconName='file'
                type='file'
                label='Choose an Avatar'
                onInput={InputHandler}
                validators={[VALIDATOR_FILE()]}
              />

              {/* // icon name is whatever is left after fa */}
              <Input
                id='Password'
                label='PASSWORD'
                placeholder='Enter Your Password'
                type='password'
                errorText='please enter a valid '
                elements='input'
                iconName='lock'
                onInput={InputHandler}
                validators={[VALIDATOR_MINLENGTH(8)]}
              />
              <Input
                id='PasswordConfirm'
                label='Password Confirm'
                placeholder='Enter Your Password Again'
                type='password'
                errorText='Password does not match '
                elements='input'
                iconName='lock'
                onInput={InputHandler}
                validators={[VALIDATOR_MINLENGTH(8)]}
              />
              <Button btnType='login' disabled={!state.isValid}>
                SIGNUP
              </Button>
              <hr style={{ marginTop: '40px' }} />
              <div className={classes.linkText}>
                <p>Already a member?</p>
                <Button to='/login' btnType='link'>
                  Login
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Signup;
