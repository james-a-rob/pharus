const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    inputCaptured: (data) => ipcRenderer.send('input-captured', data),
    configChanged: (data) => ipcRenderer.send('config-changed', data),

})