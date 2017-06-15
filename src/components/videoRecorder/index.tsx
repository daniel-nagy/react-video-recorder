import React, {Component} from 'react';

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
    if (this.canRecordVideo()) {
      navigator.mediaDevices.getUserMedia(this.props.constraints).then((stream) => {
        this.setState({
          enabled: true,
          streamUrl: URL.createObjectURL(stream)
        });
      });
    }
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
      return null;
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
