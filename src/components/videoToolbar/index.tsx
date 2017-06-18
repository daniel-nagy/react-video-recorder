import React, {Component} from 'react';

import propTypes from './propTypes';
import {Props, State} from './typings';

class VideoToolbar extends Component<Props, State> {

  static propTypes = propTypes;
  
  render(): JSX.Element {
    return (
      <div className="video-toolbar">
        {(() => {
          if (this.props.isPlaying) {
            return [
              <button key="0" onClick={this.props.pause}>Stop Recording</button>,
              <button key="1" onClick={this.props.takeScreenShot}>Take Screen Shot</button>
            ];
          }
          return <button onClick={this.props.record}>Record Video</button>;
        })()}
      </div>
    );
  }
}

export default VideoToolbar;
