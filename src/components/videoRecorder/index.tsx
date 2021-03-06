import React, {Component, CSSProperties} from 'react';
import {Promise} from 'es6-promise';

import propTypes from './propTypes';
import VideoToolbar from '../videoToolbar';
import {MediaRecorder, Props, State} from './typings';

const MediaRecorderState = {
  INACTIVE: 'inactive',
  PAUSED: 'paused',
  RECORDING: 'recording'
};

const MOBILE = /android|iPad|iPod|iPhone/.test(navigator.userAgent);

const noop = () => {};

class VideoRecorder extends Component<Props, State> {

  static propTypes = propTypes;

  static defaultProps = {
    constraints: {
      audio: true,
      video: {
        height: 720,
        width: 1280
      }
    },
    onStopRecording: noop
  };

  private mediaRecorder: MediaRecorder;
  private video: HTMLVideoElement;

  state = {
    enabled: false,
    recording: false,
    screenShots: [],
    streamUrl: null
  };

  private setVideo = (video: HTMLVideoElement) => {
    this.video = video;
  }

  canRecordVideo(): boolean {
    const {mediaDevices} = navigator;
    const {getUserMedia, webkitGetUserMedia, mozGetUserMedia} = navigator;

    return mediaDevices || getUserMedia || webkitGetUserMedia || mozGetUserMedia;
  }

  getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
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

  onVideoInput = ({currentTarget: {files}}) => {
    this.props.onStopRecording({data: files.item(0)});
  }

  pause = () => {
    this.video.pause();
    this.mediaRecorder.stop();
  }

  play = () => {
    if (this.mediaRecorder.state === MediaRecorderState.PAUSED) {
      this.mediaRecorder.resume();
    } else if (this.mediaRecorder.state === MediaRecorderState.INACTIVE) {
      this.mediaRecorder.start();
    }

    this.video.play();
  }

  takeScreenShot = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const {videoHeight: height, videoWidth: width} = this.video;

    canvas.height = height;
    canvas.width = width;
    
    context.fillRect(0, 0, width, height);
    context.drawImage(this.video, 0, 0, width, height);

    this.setState({
      screenShots: [
        ...this.state.screenShots,
        canvas.toDataURL('image/png')
      ]
    });
  }

  record = () => {
    this.getUserMedia(this.props.constraints).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.addEventListener('dataavailable', this.props.onStopRecording);

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
          {this.renderUploadBotton()}
        </div>

        {this.state.screenShots.map((screenShot, index) => {
          return <img key={index} src={screenShot} />;
        })}
      </div>
    );
  }

  renderUploadBotton() {
    if (!MOBILE) {
      return <input type="file" accept="video/*" capture={true} onChange={this.onVideoInput} />;
    }

    const buttonStyle: CSSProperties = {
      overflow: 'hidden',
      position: 'relative'
    };

    const inputStyle: CSSProperties = {
      bottom: 0,
      left: 0,
      opacity: 0,
      position: 'absolute',
      right: 0,
      top: 0
    };

    return [
      <button key={0} style={buttonStyle}>
        <span>Record Video</span>
        <input
          accept="video/*"
          capture={true}
          onChange={this.onVideoInput}
          style={inputStyle}
          type="file" />
      </button>,
      <input
        accept="video/*"
        key={1}
        onChange={this.onVideoInput}
        type="file" />
    ];
  }

  renderVideo(): JSX.Element  {
    if (!this.state.enabled) {
      return null;
    }

    return <video
      muted={true}
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
