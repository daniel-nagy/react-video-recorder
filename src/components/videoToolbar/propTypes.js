import PropTypes from 'prop-types';

export default {
  isPlaying: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  record: PropTypes.func.isRequired,
  takeScreenShot: PropTypes.func
}
