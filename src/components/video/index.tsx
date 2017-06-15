import React, {Component} from 'react';

import propTypes from './propTypes';
import {Props, State} from './typings';

export default class Video extends Component<Props, State> {
  static propTypes = propTypes;
  static defaultProps = {};

  private video: HTMLVideoElement;

  pause() {
    this.video.pause();
  }

  play() {
    this.video.play();
  }

  takeScreenShot(): string {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const {videoHeight: height, videoWidth: width} = this.video;

    canvas.height = height;
    canvas.width = width;
    
    context.fillRect(0, 0, width, height);
    context.drawImage(this.video, 0, 0, width, height);

    return canvas.toDataURL('image/png');
  }

  render() {
    return <video {...this.props} ref={video => this.video = video} />;
  }
}
