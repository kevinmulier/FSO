import PropTypes from 'prop-types';

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
        id="username"
      />
    </div>
    <div>
      Password{' '}
      <input
        type="password"
        onChange={({ target }) => setPassword(target.value)}
        value={password}
        name="Password"
        id="password"
      />
    </div>
    <button
      type="submit"
      id="submit-login">
      Log in
    </button>
  </form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
