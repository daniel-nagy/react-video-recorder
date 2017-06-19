declare class MediaRecorder {
  constructor(stream: MediaStream);
  state: 'inactive' | 'recording' | 'paused';
  pause();
  resume();
  start();
  stop();
};

export {MediaRecorder};

export interface Constraints {
  audio?: boolean;
  video?: boolean;
}

export interface Props extends React.HTMLProps<HTMLElement> {
  readonly constraints?: Constraints;
  onStopRecording?(event): void;
}

export interface State {
  enabled: boolean,
  recording: boolean,
  screenShots: string[],
  streamUrl: string
}
