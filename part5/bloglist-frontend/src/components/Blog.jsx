import { useState } from 'react';

const Blog = ({ blog }) => {
  const [visibleInfos, setVisibleInfos] = useState(false);

  const toggleVisibility = () => setVisibleInfos(!visibleInfos);

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
            likes {blog.likes} <button>like</button>
          </p>
          <p>{blog.user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
