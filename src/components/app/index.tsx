import React, {Component} from 'react';

import VideoRecorder from '../videoRecorder';

class App extends Component<React.HTMLProps<HTMLElement>, any> {

  static style = {
    display: 'flex'
  };

  render(): JSX.Element {
    return <VideoRecorder style={App.style} />;
  }
}

export default App;
