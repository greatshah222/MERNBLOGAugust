import React, { useState, useEffect, useCallback } from 'react';
import './shared/FontAwesomeIcon/FontawesomeIcons';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import BlogList from './Blogs/BlogList';
import UpdatePlace from './Blogs/UpdatePlace';
import Login from './users/Login';
import Signup from './users/Signup';
import Blog from './Blogs/CreateBlog';
import Navigations from './shared/Navigation/Navigations/Navigations';
import { useHttpHook } from './shared/Hooks/UseHttpHook';
import { ToastContainer, toast } from 'react-toastify';
import Logout from './users/Logout';
import { AuthContext } from './context/AuthContext';
import PlaceBasedOnUserId from './Blogs/BlogsOnUserID/PlaceBasedOnUserId';
import Spinner from './shared/UI/Spinner/Spinner';

function App() {
  const [token, setToken] = useState();
  const [userID, setUserID] = useState(null);
  // for user whole data from backend
  const [userData, setUserData] = useState(null);
  const [cookieFetch, setCookieFetch] = useState(false);
  const { isLoading, fetchData, error } = useHttpHook();
  const login = useCallback((uid, token, data) => {
    setUserID(uid);
    setToken(token);
    setUserData(data);
  }, []);
  const logout = useCallback(() => {
    setUserID(null);
    setToken(null);
    setUserData(null);
  }, []);
  useEffect(() => {
    let fetchToken;
    try {
      fetchToken = async () => {
        const res = await fetchData(
          'http://localhost:5000/api/v1/users/gettoken',
          'GET'
        );
        if (res.data.token && res.data.currentUser._id) {
          login(res.data.currentUser._id, res.data.token, res.data.currentUser);
        }
        // important
        // this fetch cookie should be done to true only after doing all the async function else it will give us an warning of memory leaks
        setCookieFetch(true);
      };
    } catch (error) {
      setCookieFetch(true);
      console.log(error);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
    fetchToken();
  }, [fetchData, login]);
  let route;
  if (cookieFetch && !!token) {
    route = (
      <Switch>
        <Route path='/createblog'>
          <Blog />
        </Route>
        <Route path='/places/:id'>
          <UpdatePlace />
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        {/* // show place based on userID */}
        <Route path='/:userId/places'>
          <PlaceBasedOnUserId />
        </Route>
        <Route path='/'>
          <BlogList />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else if (cookieFetch && !token) {
    route = (
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>

        <Route path='/'>
          <BlogList />
        </Route>

        <Redirect to='/login' />
      </Switch>
    );
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      {error && toast.error(error, { autoClose: 7000 })}

      {cookieFetch && (
        <AuthContext.Provider
          value={{
            isLoggedId: !!token,
            token,
            login: login,
            userID: userID,
            cookieFetch: cookieFetch,
            userData: userData,
            logout: logout,
          }}
        >
          {error && toast.error(error, { autoClose: 7000 })}
          <Navigations />

          {route}
        </AuthContext.Provider>
      )}
    </>
  );
}

export default App;
