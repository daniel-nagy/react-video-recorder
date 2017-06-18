import React, {Component} from 'react';
import {Promise} from 'es6-promise';

import propTypes from './propTypes';
import Video from '../video';
import VideoToolbar from '../videoToolbar';
import {Constraints, Props, State} from './typings';

class VideoRecorder extends Component<Props, State> {

  static propTypes = propTypes;

  static defaultProps = {
    constraints: {
      audio: false,
      video: true
    }
  };

  private video: Video;

  state = {
    enabled: false,
    recording: false,
    screenShots: [],
    streamUrl: null
  };

  private setVideo = (video: Video) => {
    this.video = video;
  }

  canRecordVideo(): boolean {
    const {mediaDevices} = navigator;
    const {getUserMedia, webkitGetUserMedia, mozGetUserMedia} = navigator;

    return mediaDevices || getUserMedia || webkitGetUserMedia || mozGetUserMedia;
  }

  getUserMedia(constraints: Constraints): Promise<MediaStream> {
    if (navigator.mediaDevices) {
      return navigator.mediaDevices.getUserMedia(constraints);
    }

    // attempt to access the camera in older browsers
    return new Promise((resolve, reject) => {
      const getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia;
      
      if (getUserMedia) {
        return getUserMedia(constraints, resolve, reject);
      }

      return reject('cannot access device camera');
    });
  }

  onPlay = () => {
    this.setState({
      recording: true
    });
  }

  onPause = () => {
    this.setState({
      recording: false
    });
  }

  pause = () => {
    this.video.pause();
  }

  play = () => {
    this.video.play();
  }

  takeScreenShot = () => {
    this.setState({
      screenShots: [
        ...this.state.screenShots,
        this.video.takeScreenShot()
      ]
    });
  }

  record = () => {
    this.getUserMedia(this.props.constraints).then((stream) => {
      this.setState({
        enabled: true,
        recording: true,
        streamUrl: URL.createObjectURL(stream)
      }, this.play);
    });
  }

  render(): JSX.Element {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {this.renderVideo()}

        <div style={{alignItems: 'center', display: 'flex', flex: '0 0 auto'}}>
          {this.renderVideoToolbar()}
          <input type="file" accept="video/*; capture=camcorder" />
        </div>

        {this.state.screenShots.map((screenShot, index) => {
          return <img key={index} src={screenShot} />;
        })}
      </div>
    );
  }

  renderVideo(): JSX.Element  {
    if (!this.state.enabled) {
      return null;
    }

    return <Video
      onPause={this.onPause}
      onPlay={this.onPlay}
      ref={this.setVideo}
      src={this.state.streamUrl} />;
  }

  renderVideoToolbar(): JSX.Element {
    if (!this.canRecordVideo()) {
      return null;
    }

    return <VideoToolbar
      record={this.record}
      pause={this.pause}
      takeScreenShot={this.takeScreenShot}
      isPlaying={this.state.recording} />;
  }
}

export default VideoRecorder;
