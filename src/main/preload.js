const { contextBridge } = require('electron');
const { webFrame } = require('electron');

// Force reset zoom on startup
webFrame.setZoomFactor(1.0);

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})