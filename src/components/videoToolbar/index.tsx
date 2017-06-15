import React, {Component} from 'react';

import propTypes from './propTypes';
import {Props, State} from './typings';

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
        <button onClick={this.props.takeScreenShot}>Take Screen Shot</button>
      </div>
    );
  }
}

export default VideoToolbar;
