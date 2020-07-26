import axios from 'axios';
const { useState, useRef, useCallback, useEffect } = require('react');

export const useHttpHook = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);

  // if we send the request but we cansel it or press multiple request at the dame time we will have an error saying we are in the other component but trying to unmount the things from other component causing memory leaks so we use AbortController for this purpose . we have to save the request in the useRef so that we dont want to change their value in the re-render process and and after that we can finally unmount the AbortController after success

  const activeHttpRequests = useRef([]);

  const fetchData = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      setIsLoading(true);
      setError(null);
      const httpAbortController = new AbortController();
      // activehttpRequests is and array so we are pushing the value of httpAbortController so that its value does not gets changed during the re-render process
      activeHttpRequests.current.push(httpAbortController);
      try {
        setError(null);
        const res = await axios({
          method,
          headers,
          url,
          data,
          withCredentials: true,
          // for abort controller
          signal: httpAbortController.signal,
        });
        // after getting the response we have to abort our controller which was just completed

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (el) => el !== httpAbortController
        );
        setError(null);
        setIsLoading(false);

        return res.data;
      } catch (error) {
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (el) => el !== httpAbortController
        );
        console.log(error.response.data.message);
        setIsLoading(false);
        setError(
          error.response.data.message ||
            'Something went wrong. please try again'
        );
        // we have to throw the error here so it can be caught
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    // when the components unmount we have to abort all the request made fot the next component or next render cycle . we are doing the cleanup function also called unmounting in the state class react.
    return () => {
      activeHttpRequests.current.forEach((el) => el.abort());
    };
  }, []);
  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, fetchData, clearError };
};
