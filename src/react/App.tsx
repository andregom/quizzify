import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
const  channels = require('../shared/constants');
declare global {
  interface Window {
    ipcRenderer:any;
  }
}
const { ipcRenderer } = window; 

function App(props: any) {
  const [appName, setAppName] = useState('');
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    /* ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event: any, arg: { appName: any; appVersion: any; }) => {
    ipcRenderer.removeAllListeners(channels.APP_INFO);
    const { appName, appVersion } = arg;
    setAppName(appName);
    setAppVersion(appVersion);
  }); */
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.<br />
          <p>{appName} version {appVersion}</p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
