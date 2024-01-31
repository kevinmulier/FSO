import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';

import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(response));
      setSuccessMessage(
        `${blogObject.title} by ${blogObject.author} added successfully`,
      );
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUserJSON', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setSuccessMessage('Successfully logged in!');
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

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedUserJSON');
      setUser(null);
      setSuccessMessage('Successfully logged out!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (exception) {
      setErrorMessage('Logout failed');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <Togglable
        buttonLabel={'new blog'}
        ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {successMessage && (
          <Notification
            message={successMessage}
            type={'success-notification'}
          />
        )}
        {errorMessage && (
          <Notification
            message={errorMessage}
            type={'error-notification'}
          />
        )}
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
      {successMessage && (
        <Notification
          message={successMessage}
          type={'success-notification'}
        />
      )}
      {errorMessage && (
        <Notification
          message={errorMessage}
          type={'error-notification'}
        />
      )}
      <p>
        {user.username} logged in{' '}
        <button onClick={handleLogout}>Log out</button>
      </p>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </div>
  );
};

export default App;
