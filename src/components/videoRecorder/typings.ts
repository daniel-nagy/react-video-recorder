export interface Constraints {
  audio?: boolean;
  video?: boolean;
}

export interface Props extends React.HTMLProps<HTMLElement> {
  readonly constraints?: Constraints;
}

export interface State {
  enabled: boolean,
  recording: boolean,
  screenShots: string[],
  streamUrl: string
}
