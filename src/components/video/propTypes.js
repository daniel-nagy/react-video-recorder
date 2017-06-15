import {PropTypes} from 'react';

export default {
  autoplay: PropTypes.oneOf(['', 'autoplay']),
  crossorigin: PropTypes.oneOf(['anonymous', 'use-credentials']),
  height: PropTypes.number,
  loop: PropTypes.oneOf(['', 'loop']),
  muted: PropTypes.oneOf(['', 'muted']),
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  preload: PropTypes.oneOf(['', 'auto', 'metadata', 'none']),
  poster: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.number
}
