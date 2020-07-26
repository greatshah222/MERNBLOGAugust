import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpHook } from '../../shared/Hooks/UseHttpHook';
import classes from '../BlogsUserPage.module.css';

import BlogsUserPage from '../BlogsUserPage';
import Modal from '../../shared/UI/Modal/Modal';
import Button from '../../shared/UI/Button/Button';
import { ToastContainer, toast } from 'react-toastify';

function PlaceBasedOnUserId() {
  const userID = useParams().userId;
  const [place, setPlace] = useState([]);

  // for showing modal when no place found
  const [showModal, setShowmodal] = useState(false);
  const { isLoading, fetchData, error } = useHttpHook();
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetchData(
          `http://localhost:5000/api/v1/places/user/${userID}`,
          'GET'
        );

        await setPlace(res.place.places);

        if (res.place.places.length === 0) {
          setShowmodal(true);
        }
        await setDataFetched(true);
      } catch (err) {
        // toast.error(err.response.data.message);
      }
    };
    fetchPlace();
  }, [fetchData, userID]);

  // for closing the modal when user clicks the modal
  const toggleModalHandler = () => {
    setShowmodal((prevState) => !prevState);
  };
  const onDeleteHandler = (id) => {
    setPlace(place.filter((el) => el._id !== id));
  };
  let content;

  if (place.length > 0 && !isLoading && dataFetched) {
    content = place.map((el) => (
      <BlogsUserPage place={el} key={el._id} onDelete={onDeleteHandler} />
    ));
  }
  return (
    <>
      {error & toast.error(error)}
      {!isLoading && dataFetched && (
        <Modal
          show={showModal}
          footer={
            <div className={classes.Blog__ButtonModal}>
              <Button
                onClick={toggleModalHandler}
                to='/'
                btnType=''
                style={{ color: 'red', border: '1px dashed red' }}
              >
                {' '}
                Go Back
              </Button>
              <Button
                onClick={toggleModalHandler}
                to='/createblog'
                style={{ border: '1px solid blue' }}
              >
                Confirm
              </Button>
            </div>
          }
          header={'No Place Found!'}
        >
          <p style={{ fontSize: '15px', fontWeight: 'bold' }}>
            {' '}
            Do You want to create a new place?
          </p>
        </Modal>
      )}
      <ToastContainer />
      <div className={classes.MainSectionPrimary}>{content}</div>
    </>
  );
}

export default PlaceBasedOnUserId;
