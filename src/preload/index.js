import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer

const apiNewWindow = {
  newWindow: () => {
    ipcRenderer.send('new-window')
  }
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', apiNewWindow)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)

  // @ts-ignore (define in dts)
  window.api = apiNewWindow
}
