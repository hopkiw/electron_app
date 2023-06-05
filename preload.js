/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})

contextBridge.exposeInMainWorld('electronAPI', {
  getFilePaths: () => ipcRenderer.invoke('getFilePaths'),
  getAllTags: () => ipcRenderer.invoke('getAllTags'),
  getTags: (path) => ipcRenderer.invoke('getTags', path),
  tagFile: (path, tag) => ipcRenderer.send('tagFile', path, tag)
})
