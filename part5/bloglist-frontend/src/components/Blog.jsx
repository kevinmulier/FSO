import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user, setSuccessMessage, setErrorMessage, setBlogs }) => {
  const [visibleInfos, setVisibleInfos] = useState(false);

  const toggleVisibility = () => setVisibleInfos(!visibleInfos);

  const increaseLikes = async () => {
    try {
      const response = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs((prevBlogs) => {
        return prevBlogs.map((b) =>
          b.id === blog.id ? { ...b, likes: response.likes } : b,
        );
      });
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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
      <button onClick={toggleVisibility}>
        {visibleInfos ? 'hide' : 'show'}
      </button>
      {visibleInfos && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={increaseLikes}>like</button>
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
      )}
    </div>
  );
};

export default Blog;
