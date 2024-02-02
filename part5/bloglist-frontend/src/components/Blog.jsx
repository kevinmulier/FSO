import { useState } from 'react';
import PropTypes from 'prop-types';
import Togglable from './Togglable';

import blogService from '../services/blogs';

const Blog = ({
  blog,
  user,
  setSuccessMessage,
  setErrorMessage,
  setBlogs,
  increaseLikes,
}) => {
  const deleteBlog = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
        const response = await blogService.deleteEntry(blog.id);
        setBlogs((v) => v.filter((el) => el.id !== blog.id));
        setSuccessMessage(`${blog.title}'s deleted successfully`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="blog-container">
      {blog.title} - {blog.author}{' '}
      <Togglable
        buttonLabel="show"
        hideLabel="hide">
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button onClick={() => increaseLikes(blog)}>like</button>
          </p>
          <p>{blog.user.username}</p>
          {user.username === blog.user.username && (
            <button
              onClick={deleteBlog}
              className="error-button">
              delete blog
            </button>
          )}
        </div>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  increaseLikes: PropTypes.func.isRequired,
};

export default Blog;
