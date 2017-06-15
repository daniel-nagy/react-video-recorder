export interface Props {
  readonly isPlaying: boolean;
  pause(): void;
  play(): void;
  takeScreenShot(): void;
}

export interface State {}
