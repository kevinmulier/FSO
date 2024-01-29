import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/loginForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
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
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUserJSON', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      window.alert('Wrong credentials');
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
