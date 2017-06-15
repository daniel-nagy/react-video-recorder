import {PropTypes} from 'react';

export default {
  isPlaying: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  takeScreenShot: PropTypes.func
}
