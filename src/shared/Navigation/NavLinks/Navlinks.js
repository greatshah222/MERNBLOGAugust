import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../Navigations/Navigations.module.css';
import { AuthContext } from '../../../context/AuthContext';

function Navlinks(props) {
  const { isLoggedId, userID, userData } = useContext(AuthContext);
  return (
    <ul className={classes.navUl}>
      {isLoggedId && (
        <li>
          <NavLink
            onClick={props.closeSideBar}
            to={`/${userID}/places`}
            activeClassName={classes.active}
            exact
          >
            My Blogs
          </NavLink>
        </li>
      )}
      {isLoggedId && (
        <li>
          <NavLink
            onClick={props.closeSideBar}
            to='/createblog'
            activeClassName={classes.active}
          >
            Create Blog
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          onClick={props.closeSideBar}
          activeClassName={classes.active}
          to='/'
          exact
        >
          All Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={props.closeSideBar}
          activeClassName={classes.active}
          to='/donate'
          exact
        >
          Donate
        </NavLink>
      </li>
      {!isLoggedId && (
        <li>
          <NavLink
            to='/login'
            onClick={props.closeSideBar}
            activeClassName={classes.active}
          >
            Login
          </NavLink>
        </li>
      )}
      {isLoggedId && (
        <li>
          <NavLink
            to='/logout'
            onClick={props.closeSideBar}
            activeClassName={classes.active}
          >
            Logout
          </NavLink>
        </li>
      )}
      {isLoggedId && userData && (
        <li>
          <NavLink
            to='/ihbuib'
            onClick={props.closeSideBar}
            activeClassName={classes.active}
            className={classes.NavLinkProfileImage}
          >
            <img
              src={`http://localhost:5000/uploads/user/${userData.image}`}
              alt={userData.name}
              className={classes.userProfileImage}
            />
            {userData.name}
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default Navlinks;
