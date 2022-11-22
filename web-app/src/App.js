import { useState } from 'react';
import Metrics from './screens/Metrics';
import Home from './screens/Home';
import Settings from './screens/Settings';

import './App.css';

function App() {
  // top level state needs config, metrics and user
  // In memory and local storage
  const [screen, setScreen] = useState("home");// home|settings|metrics


  switch (screen) {
    case "home":
      return (<Home setScreen={setScreen} />)
    case "settings":
      return (<Settings setScreen={setScreen} />)
    case "analytics":
      return (<Metrics setScreen={setScreen} />)
    default:
      return (<Home setScreen={setScreen} />)
  }
}

export default App;
