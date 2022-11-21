import React from 'react';
import Video from './components/Video';
import './App.css';

function App() {
  // top level state needs config, metrics and user
  // In memory and local storage
  return (
    <div className="App">
      <Video/>
    </div>
  );
}

export default App;
