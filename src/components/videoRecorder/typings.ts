export interface Constraints {
  audio?: boolean;
  video?: boolean;
}

export interface Props {
  readonly constraints?: Constraints;
}

export interface State {
  enabled: boolean,
  recording: boolean,
  screenShots: string[],
  streamUrl: string
}
