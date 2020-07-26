import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../INPUT/Input.module.css';
function ImageUpload(props) {
  const imageChangeHandler = (e) => {
    const pickedFile = e.target.files[0];
    props.onInput(props.id, pickedFile, true);
  };
  return (
    <div className={`${classes.formInput} ${classes.formInputImageUpload}`}>
      <FontAwesomeIcon icon={props.iconName} className={classes.iconColor} />
      <input
        id={props.id}
        type={props.type}
        className={classes.formInputImageUploadInput}
        onChange={imageChangeHandler}
        accept='.jpg,.png,.pdf,.jpeg'
      />
    </div>
  );
}

export default ImageUpload;
