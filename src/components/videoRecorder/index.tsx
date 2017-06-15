import React, {Component} from 'react';

import propTypes from './propTypes';
import VideoToolbar from '../videoToolbar';

interface Constraints {
  audio?: boolean;
  video?: boolean;
}

interface Props {
  readonly constraints?: Constraints;
}

interface State {
  enabled: boolean,
  playing: boolean
}

class VideoRecorder extends Component<Props, State> {

  static propTypes = propTypes;

  static defaultProps = {
    constraints: {
      audio: false,
      video: true
    }
  };

  private video: HTMLVideoElement;
  private streamUrl: string;

  state = {
    enabled: false,
    playing: false
  };

  private setVideo = (video: HTMLVideoElement) => {
    this.video = video;
  }

  canRecordVideo() {
    return Boolean(navigator.mediaDevices);
  }

  componentWillMount() {
    if (this.canRecordVideo()) {
      navigator.mediaDevices.getUserMedia(this.props.constraints).then((stream) => {
        this.streamUrl = URL.createObjectURL(stream);

        this.setState({
          enabled: true
        });
      });
    }
  }

  get currentTime(): number {
    return this.video ? this.video.currentTime : NaN;
  }

  get ended(): boolean {
    return this.video ? this.video.ended : false;
  }

  get paused(): boolean {
    return this.video ? this.video.paused : false;
  }

  isPlaying(): boolean {
    return this.currentTime > 0 && !this.paused && !this.ended;
  }

  play = () => {
    this.video.play();

    this.setState({
      playing: this.isPlaying()
    });
  }

  pause = () => {
    this.video.pause();

    this.setState({
      playing: this.isPlaying()
    });
  }

  render() {
    if (!this.state.enabled) {
      return null;
    }

    return (
      <div>
        <video ref={this.setVideo} src={this.streamUrl} />
        <VideoToolbar play={this.play} pause={this.pause} isPlaying={this.state.playing} />
      </div>
    );
  }
}

export default VideoRecorder;
