import React, { useState, useContext } from 'react';
import classes from '../shared/UI/INPUT/Input.module.css';
import Input from '../shared/UI/INPUT/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_FILE,
} from '../shared/validation/validator';
import Button from '../shared/UI/Button/Button';
import { useForm } from '../shared/Hooks/UseForm';
import { useHttpHook } from '../shared/Hooks/UseHttpHook';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../shared/UI/Spinner/Spinner';
import ImageUpload from '../shared/UI/ImageUpload/ImageUpload';

function Blog() {
  const history = useHistory();
  const { userID } = useContext(AuthContext);
  const { isLoading, error, fetchData } = useHttpHook();

  const [showErrorNotification, setShowErorNotification] = useState(false);
  // we need data form useForm cause they are our state and we need to send to the backend from this satte
  const [state, InputHandler] = useForm({
    Title: {
      value: '',
      isValid: false,
    },
    Description: {
      value: '',
      isValid: false,
    },
    Address: {
      value: '',
      isValid: false,
    },
    Image: {
      value: '',
      isValid: true,
    },
  });
  const formSubmitHandler = async (e) => {
    const { Title, Description, Image, Address } = state.inputs;
    e.preventDefault();
    setShowErorNotification((prevState) => !prevState);
    try {
      // to send the image we have to use the FormData
      const formData = new FormData();
      formData.append('title', Title.value);
      formData.append('image', Image.value);
      formData.append('description', Description.value);
      formData.append('address', Address.value);

      await fetchData(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/places`,
        'POST',
        formData,
        {
          'Content-Type': 'multipart/form-data',
        }
      );

      toast.success('New Place added');
      setTimeout(() => {
        history.push(`/${userID}/places}`);
      }, 500);
    } catch (error) {
      console.log(error.response.data.message);
      setShowErorNotification(false);
    }
  };

  // here in the try block the error is already set by our Http hooks so we error is true and showErrorNotification is made to true which will display the error in our toast notification

  // after that it will go to catch block where setErrorNotification is made false and when we change the next input it will not pop up the message again cause we have not submitted the form yet  which is the solution. if not than one evry input after there is an error it will give the same message againand again.
  return (
    <>
      <ToastContainer />
      {error &&
        showErrorNotification &&
        toast.error(error, { autoClose: 5000 })}
      <div className={classes.formPrimary}>
        {/* formprimary is for background color and total height */}
        <div className={classes.formSecondary}>
          {/* formSecondary is to make image and form display flex */}
          {/* <img src={loginLogo} alt='' /> */}
          {isLoading ? (
            <Spinner />
          ) : (
            <form
              className={`${classes.form} ${classes.formBlog}`}
              onSubmit={formSubmitHandler}
            >
              {/* // formheader for line after h2 and font size */}
              <h2 className={classes.formHeader}>Create New Blog</h2>
              <Input
                id='Title'
                label='Title'
                placeholder='Enter Your Title'
                type='text'
                errorText='At least 10 character'
                elements='input'
                iconName='heading'
                validators={[VALIDATOR_MINLENGTH(10)]}
                onInput={InputHandler}
              />
              <Input
                id='Address'
                label='Address'
                placeholder='Enter Your Address'
                type='text'
                errorText='Please provide a valid '
                elements='input'
                iconName='map-marker'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={InputHandler}
              />

              {/* // icon name is whatever is left after fa */}
              <Input
                id='Description'
                label='Description'
                placeholder='Enter Your Description'
                type='text'
                errorText='At least 10 character '
                elements='textarea'
                iconName='info'
                rows='4'
                validators={[VALIDATOR_MINLENGTH(8)]}
                onInput={InputHandler}
              />
              <ImageUpload
                id='Image'
                iconName='file-image'
                type='file'
                label='Choose an Image'
                onInput={InputHandler}
                validators={[VALIDATOR_FILE()]}
              />
              <Button btnType='login' disabled={!state.isValid}>
                Create New Post
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
