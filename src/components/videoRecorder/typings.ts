declare class MediaRecorder {
  constructor(stream: MediaStream);
  state: 'inactive' | 'recording' | 'paused';
  pause();
  resume();
  start();
  stop();
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
};

export {MediaRecorder};

export interface Props extends React.HTMLProps<HTMLElement> {
  readonly constraints?: MediaStreamConstraints;
  onStopRecording?(event): void;
}

export interface State {
  enabled: boolean,
  recording: boolean,
  screenShots: string[],
  streamUrl: string
}
