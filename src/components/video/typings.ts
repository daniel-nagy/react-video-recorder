export interface Props {
  readonly autoplay?: '' | 'autoplay';
  readonly controls?: '' | 'controls';
  readonly crossorigin?: 'anonymous' | 'use-credentials';
  readonly height?: number;
  readonly loop?: '' | 'loop';
  readonly muted?: '' | 'muted';
  onPause(event: Event): void;
  onPlay(event: Event): void;
  readonly preload?: '' | 'auto' | 'metadata' | 'none';
  readonly poster?: string;
  readonly src?: string;
  readonly width?: number;
}

export interface State {
  playing: boolean;
}
