import React, { useState, useContext } from 'react';
import classes from './BlogsUserPage.module.css';
import Button from '../shared/UI/Button/Button';
import Modal from '../shared/UI/Modal/Modal';
import { useHttpHook } from '../shared/Hooks/UseHttpHook';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../context/AuthContext';
import Map from '../shared/map/Map';

function BlogsUserPage(props) {
  const { userID } = useContext(AuthContext);
  const {
    address,
    description,
    image,
    title,
    _id,
    creator,
    location,
  } = props.place;
  const { fetchData } = useHttpHook();
  const [showConfirmModalHandler, setShowConfirmModalHandler] = useState(false);

  const [showMap, setShowMap] = useState(false);
  const mapOpenHandler = () => {
    setShowMap((prevState) => !prevState);
  };

  const toggleConfirmDeletehandler = () => {
    setShowConfirmModalHandler((prevState) => !prevState);
  };
  const deteleConfirmationHandler = async () => {
    // close the modal first

    toggleConfirmDeletehandler();
    try {
      await fetchData(
        `http://localhost:5000/api/v1/places/${_id}`,
        'DELETE',
        null,
        {
          'Content-Type': 'application/json',
        }
      );
      props.onDelete(_id);
      toast.success(' Deleted Successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <>
        {/* // onCancel is for backdrop so when u press the backdrop modal will close */}
        <Modal
          show={showConfirmModalHandler}
          onCancel={toggleConfirmDeletehandler}
          footer={
            <div className={classes.Blog__ButtonModal}>
              <Button btnType='Danger' onClick={deteleConfirmationHandler}>
                Delete
              </Button>
              <Button onClick={toggleConfirmDeletehandler}>Cancel</Button>
            </div>
          }
          header={'Are You Sure?'}
        >
          <p style={{ fontSize: '15px', fontWeight: 'bold' }}>
            {' '}
            Do You want to proceed and delete this place ? Please note that it
            can not be undone!!!
          </p>
        </Modal>
        <Modal
          show={showMap}
          onCancel={mapOpenHandler}
          header={address}
          footer={
            <div style={{ textAlign: 'center' }}>
              <Button onClick={mapOpenHandler} btnType='map'>
                CLOSE
              </Button>
            </div>
          }
        >
          <div>
            <Map center={location} zoom={7} />
          </div>
        </Modal>

        <div className={classes.MainSectionSecondary}>
          <div className={classes.ImagePrimary}>
            <img
              src={`http://localhost:5000/uploads/images/${image}`}
              alt='evant name'
            />
          </div>
          <div className={classes.TextContainerPrimary}>
            <h2>{title}</h2>
            <h5>{description}</h5>
            <h3>
              <strong>{address}</strong>{' '}
            </h3>
            <div className={classes.ButtonPrimary}>
              {/* // button to means it ia a Link(react-link) */}
              <Button btnType='Primary' onClick={mapOpenHandler}>
                View Map
              </Button>
            </div>
            {userID === creator && (
              <div className={classes.ButtonDelete}>
                {' '}
                <>
                  <Button to={`/places/${_id}`}>
                    <FontAwesomeIcon icon='edit' />
                  </Button>
                  <Button onClick={toggleConfirmDeletehandler} btnType='Danger'>
                    <FontAwesomeIcon icon='trash' />
                  </Button>
                </>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export default BlogsUserPage;
