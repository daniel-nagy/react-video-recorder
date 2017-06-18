import PropTypes from 'prop-types';

export default {
  autoplay: PropTypes.bool,
  controls: PropTypes.bool,
  crossorigin: PropTypes.oneOf(['anonymous', 'use-credentials']),
  height: PropTypes.number,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  preload: PropTypes.oneOf(['', 'auto', 'metadata', 'none']),
  poster: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.number
}
