const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      Username{' '}
      <input
        type="text"
        onChange={({ target }) => setUsername(target.value)}
        value={username}
        name="Username"
      />
    </div>
    <div>
      Password{' '}
      <input
        type="password"
        onChange={({ target }) => setPassword(target.value)}
        value={password}
        name="Password"
      />
    </div>
    <button type="submit">Log in</button>
  </form>
);

export default LoginForm;
