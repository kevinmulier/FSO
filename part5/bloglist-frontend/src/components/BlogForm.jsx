import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    await createBlog(blogObject);
    setNewBlog({ title: '', author: '', url: '' });
  };

  const handleTitleChange = (event) => {
    setNewBlog((c) => ({
      ...newBlog,
      title: event.target.value,
    }));
  };

  const handleAuthorChange = (event) => {
    setNewBlog((c) => ({
      ...newBlog,
      author: event.target.value,
    }));
  };

  const handleUrlChange = (event) => {
    setNewBlog((c) => ({
      ...newBlog,
      url: event.target.value,
    }));
  };

  return (
    <>
      <h3>create new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title{' '}
          <input
            type="text"
            onChange={handleTitleChange}
            value={newBlog.title}
            placeholder="type blog title here..."
            id="title-input"
          />
        </div>
        <div>
          Author{' '}
          <input
            type="text"
            onChange={handleAuthorChange}
            value={newBlog.author}
            placeholder="type blog author here..."
            id="author-input"
          />
        </div>
        <div>
          Url{' '}
          <input
            type="text"
            onChange={handleUrlChange}
            value={newBlog.url}
            placeholder="type blog url here..."
            id="url-input"
          />
        </div>
        <button
          type="submit"
          id="submit-blog">
          create
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
