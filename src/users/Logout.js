import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useHttpHook } from '../shared/Hooks/UseHttpHook';
import { Redirect } from 'react-router-dom';

function Logout() {
  const { logout } = useContext(AuthContext);
  const { fetchData } = useHttpHook();
  const [redirect, SetReDirect] = useState(false);
  useEffect(() => {
    let attemptLogout;
    try {
      attemptLogout = async () => {
        await fetchData('http://localhost:5000/api/v1/users/logout', 'GET');

        toast.success('Logout successful');

        SetReDirect(true);
        // logout should be at the end cause it is in other compnent and as sson as SetRedirect is true it will go app.js and not cause error
        logout();
      };
    } catch (error) {
      toast.error(error.response.data.message);
      SetReDirect(true);
    }
    attemptLogout();
  }, [logout, fetchData]);
  return (
    <div>
      <ToastContainer />
      {redirect && <Redirect to='/' />}
    </div>
  );
}

export default Logout;
