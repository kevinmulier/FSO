import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setSuccessMessage, setErrorMessage }) => {
  const [visibleInfos, setVisibleInfos] = useState(false);

  const toggleVisibility = () => setVisibleInfos(!visibleInfos);

  const increaseLikes = async () => {
    try {
      const response = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      blog.likes = response.likes;
      setSuccessMessage(`${blog.title}'s liked successfully`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
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
        </div>
      )}
    </div>
  );
};

export default Blog;
