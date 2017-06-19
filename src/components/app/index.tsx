import React, {Component} from 'react';

import VideoRecorder from '../videoRecorder';

class App extends Component<React.HTMLProps<HTMLElement>, any> {

  onStopRecording = (event) => {
    console.log(event.data.type);

    var HttpRequest = new XMLHttpRequest();

    HttpRequest.open('POST', 'http://localhost:3000/video', true);

    HttpRequest.onload = (event) => {
      console.log('uploaded');
    };

    HttpRequest.send(event.data);
  }

  render(): JSX.Element {
    return <VideoRecorder onStopRecording={this.onStopRecording} />;
  }
}

export default App;
