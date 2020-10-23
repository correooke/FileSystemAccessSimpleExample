import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

async function action(contents) {
  async function getFileHandle() {
    const opts = {
      types: [
        {
          description: 'Text Files',
          accept: {
            'text/plain': ['.txt', '.text'],
            'text/html': ['.html', '.htm']
          }
        }
      ]
    };
    return await window.showOpenFilePicker(opts);
  }
  async function saveFile(fileHandle, text) {
    if (!fileHandle) {
      fileHandle = await window.showSaveFilePicker();
    }
    const writable = await fileHandle.createWritable();
    await writable.write(text);
    await writable.close();
  }
  debugger
  const fHandle = await getFileHandle();
  const file = await fHandle[0].getFile();
  const text = await file.text();
  saveFile(fHandle[0], contents + text);
}

function App() {
  const [state, setState] = useState("")

  return (
    <div className="App">
      <input type="text" value={state} onChange={e => setState(e.currentTarget.value)} />
      <button onClick={() => action(state)}>Click</button>
    </div>
  );
}

export default App;
