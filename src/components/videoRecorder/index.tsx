import React, {Component} from 'react';
import Promise from 'es6-promise';

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

  canRecordVideo() {
    return Boolean(navigator.mediaDevices);
  }

  componentWillMount() {
    this.getUserMedia(this.props.constraints).then((stream) => {
      this.setState({
        enabled: true,
        streamUrl: URL.createObjectURL(stream)
      });
    });
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

  render() {
    if (!this.state.enabled) {
      return <input type="file" accept="video/*;capture=camcorder" />;
    }

    return (
      <div>
        <Video
          onPause={this.onPause}
          onPlay={this.onPlay}
          ref={this.setVideo}
          src={this.state.streamUrl} />

        <VideoToolbar
          play={this.play}
          pause={this.pause}
          takeScreenShot={this.takeScreenShot}
          isPlaying={this.state.recording} />

          {this.state.screenShots.map((screenShot, index) => {
            return <img key={index} src={screenShot} />;
          })}
      </div>
    );
  }
}

export default VideoRecorder;
