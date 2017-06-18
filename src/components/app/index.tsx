import React, {Component} from 'react';

import VideoRecorder from '../videoRecorder';

class App extends Component<React.HTMLProps<HTMLElement>, any> {
  render(): JSX.Element {
    return <VideoRecorder />;
  }
}

export default App;
