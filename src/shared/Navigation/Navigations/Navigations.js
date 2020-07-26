import React, { useState } from 'react';
import Navlinks from '../NavLinks/Navlinks';
import classes from './Navigations.module.css';
import NavigationHeader from '../NavigationHeader/NavigationHeader';
import SideBar from '../SideBar/SideBar';

function Navigations() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const toggleSideBarHandler = () => {
    setOpenSideBar((openSideBar) => !openSideBar);
  };
  return (
    <>
      {/* // sidebar is controlled by the transition so it can stay here */}
      <SideBar show={openSideBar}>
        <button
          className={classes.closeSideBarButton}
          onClick={toggleSideBarHandler}
        >
          &times;
        </button>
        <nav className={classes.MobileNav}>
          <Navlinks closeSideBar={toggleSideBarHandler} />
        </nav>
      </SideBar>
      <NavigationHeader>
        <div className={classes.navContainer}>
          {/* // HamBurgerMenu and logoSmallerScreen will only be visible when screen is less than 925px */}
          <button
            className={classes.HamBurgerMenu}
            onClick={toggleSideBarHandler}
          >
            <span />
            <span />
            <span />
          </button>
          <h2 className={classes.logoSmallerScreen}>mblog</h2>

          {/* // from here below is for man navigation for big screen */}

          <nav className={classes.DesktopNav}>
            <h1 className={classes.logo}>mblog</h1>
            {/* // pass the closeSideBar also to big screen Navbar cause when the
            user is in the smaller screen(inside the nav sidebar) and they
            increase the size of the screen our sidebar will close auto because
            of the width. here if the user clicks on the navlink in the bigger
            screen they will be redirected but as soon as they decrease the screen size the sidebar will reappear again so to close the sidebar when the user press the navBar when on the big screen we have to pass also the closeSideBar */}
            <Navlinks closeSideBar={toggleSideBarHandler} />
          </nav>
        </div>
      </NavigationHeader>
    </>
  );
}

export default Navigations;
