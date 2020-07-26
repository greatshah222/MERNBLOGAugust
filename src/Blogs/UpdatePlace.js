import React, { useEffect, useState } from 'react';
import { useForm } from '../shared/Hooks/UseForm';
import { useHttpHook } from '../shared/Hooks/UseHttpHook';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useHistory } from 'react-router-dom';
import classes from '../shared/UI/INPUT/Input.module.css';
import Input from '../shared/UI/INPUT/Input';
import Button from '../shared/UI/Button/Button';
import { VALIDATOR_MINLENGTH } from '../shared/validation/validator';

import Spinner from '../shared/UI/Spinner/Spinner';

function UpdatePlace() {
  const { isLoading, error, fetchData } = useHttpHook();
  const [loadedPlace, setLoadedPlace] = useState();
  const id = useParams().id;
  const history = useHistory();

  const [state, InputHandler] = useForm(
    {
      Title: {
        value: '',
        isValid: false,
      },
      Description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetchData(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/places/${id}`,
          'GET'
        );

        setLoadedPlace(res.place);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    fetchPlace();
  }, [fetchData, id]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await fetchData(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/places/${id}`,
        'PATCH',
        {
          title: state.inputs.Title.value,
          description: state.inputs.Description.value,
        },
        {
          'Content-Type': 'application/json',
        }
      );
      history.goBack();
      toast.success('Updated Successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  let content = <Spinner />;
  if (loadedPlace && !isLoading && !error) {
    content = (
      <div className={classes.formPrimary}>
        {/* formprimary is for background color and total height */}
        <div className={classes.formSecondary}>
          {/* formSecondary is to make image and form display flex */}
          {/* <img src={loginLogo} alt='' /> */}

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
              initialValue={loadedPlace.title}
              initialValid={true}
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
              initialValue={loadedPlace.description}
              initialValid={true}
            />
            <Button btnType='login' disabled={!state.isValid}>
              Update Post
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {content}
    </>
  );
}

export default UpdatePlace;
