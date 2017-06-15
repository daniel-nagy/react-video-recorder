import React, {Component} from 'react';
import propTypes from './propTypes';

interface Props {
  readonly isPlaying: boolean;
  pause(): void;
  play(): void;
}

interface State {}

class VideoToolbar extends Component<Props, State> {

  static propTypes = propTypes;
  
  render() {
    return (
      <div className="video-toolbar">
        {(() => {
          if (this.props.isPlaying) {
            return <button onClick={this.props.pause}>Stop Recording</button>
          }
          return <button onClick={this.props.play}>Record</button>;
        })()}
        <button>Take Screen Shot</button>
      </div>
    );
  }
}

export default VideoToolbar;
