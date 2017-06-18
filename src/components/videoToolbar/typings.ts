export interface Props {
  pause(): void;
  readonly isPlaying: boolean;
  record(): void;
  takeScreenShot(): void;
}

export interface State {}
