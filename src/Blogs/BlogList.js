import React, { useEffect, useState } from 'react';
import { useHttpHook } from '../shared/Hooks/UseHttpHook';
import BlogsUserPage from './BlogsUserPage';
import classes from './BlogsUserPage.module.css';
import { toast } from 'react-toastify';
import Spinner from '../shared/UI/Spinner/Spinner';

function BlogList() {
  const { isLoading, fetchData } = useHttpHook();
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetchData(
          `http://localhost:5000/api/v1/places`,
          'GET'
        );
        setBlogs(res.place);
      } catch (error) {
        // if u are setting the toast here then u cannnot use the error message from the usehttp u should use local from here
        toast.error(error.response.data.message);
      }
    };

    fetchBlogData();
  }, [fetchData]);

  const onDeleteHandler = (id) => {
    setBlogs(blogs.filter((el) => el._id !== id));
  };
  let content;

  !isLoading &&
    blogs &&
    (content = blogs.map((el) => (
      <BlogsUserPage place={el} key={el._id} onDelete={onDeleteHandler} />
    )));
  if (isLoading) {
    return <Spinner />;
  }

  return <div className={classes.MainSectionPrimary}>{content}</div>;
}

export default BlogList;
