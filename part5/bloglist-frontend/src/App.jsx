import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/loginForm';

import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      blogService.setToken(user.token);
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    try {
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));
      setNewBlog({ title: '', author: '', url: '' });
    } catch (exception) {
      window.alert(exception.response.data.error);
    }
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUserJSON', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      window.alert(exception.response.data.error);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedUserJSON');
      setUser(null);
    } catch (exception) {
      window.alert('Logout failed');
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in{' '}
        <button onClick={handleLogout}>Log out</button>
      </p>
      <h3>create new</h3>
      <BlogForm
        addBlog={addBlog}
        newBlog={newBlog}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
      />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
