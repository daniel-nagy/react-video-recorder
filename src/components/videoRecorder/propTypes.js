import PropTypes from 'prop-types';

export default {
  constraints: PropTypes.shape({
    audio: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    video: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  }),
  onStopRecording: PropTypes.func
}
