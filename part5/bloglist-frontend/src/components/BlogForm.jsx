const BlogForm = ({
  addBlog,
  newBlog,
  handleAuthorChange,
  handleUrlChange,
  handleTitleChange,
}) => (
  <form onSubmit={addBlog}>
    <div>
      Title{' '}
      <input
        type="text"
        onChange={handleTitleChange}
        value={newBlog.Title}
      />
    </div>
    <div>
      Author{' '}
      <input
        type="text"
        onChange={handleAuthorChange}
        value={newBlog.author}
      />
    </div>
    <div>
      Url{' '}
      <input
        type="text"
        onChange={handleUrlChange}
        value={newBlog.url}
      />
    </div>
    <button type="submit">create</button>
  </form>
);

export default BlogForm;
