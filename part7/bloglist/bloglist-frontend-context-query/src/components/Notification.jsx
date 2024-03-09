import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  return <p className={type}>{message}</p>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Notification;
