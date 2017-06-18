export interface HTMLVideoElementEvents {
  onPause(event: React.FormEvent<HTMLVideoElement>): void;
  onPlay(event: React.FormEvent<HTMLVideoElement>): void;
};

export interface HTMLVideoElementProps extends HTMLVideoElementEvents {
  readonly autoplay?: boolean;
  readonly controls?: boolean;
  readonly crossorigin?: 'anonymous' | 'use-credentials';
  readonly height?: number;
  readonly loop?: boolean;
  readonly muted?: boolean;
  readonly preload?: '' | 'auto' | 'metadata' | 'none';
  readonly poster?: string;
  readonly src?: string;
  readonly width?: number;
}

export interface State {
  playing: boolean;
}
