

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    //doAThing()
    const backButton = document.querySelector('#back-button')
    const forwardButton = document.querySelector('#forward-button')
    const reloadButton = document.querySelector('#reload-button')
    const searchButton = document.querySelector('#search-button')
    const newWindowButton = document.querySelector('#new-window-button')
    const goButton = document.querySelector('#go')

    const urlInputField = document.querySelector('#url-input')

    const webview = document.querySelector('#foo')
    searchButton.addEventListener('click', () => {
      let browserUrl = 'https://www.google.com'
      urlInputField.value = browserUrl
      webview.src = browserUrl
    })

    function handleUrl(e) {
      const inputUrl = e.target.value
      if (/^https:/.test(inputUrl)) {
        webview.src = inputUrl
      } else {
        webview.src = `https://www.${inputUrl}`
      }
    }
    goButton.addEventListener('click', () => {
      const inputUrl = urlInputField.value
      if (/^https:/.test(inputUrl)) {
        webview.src = inputUrl
      } else {
        webview.src = `https://www.${inputUrl}`
      }
    })
    urlInputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleUrl(e)
      }
    })

    webview.addEventListener('did-navigate', (e) => {
      let urlNavigate = e.url
      urlInputField.value = urlNavigate
    })
   
    webview.addEventListener('dom-ready', () => {
      webview.executeJavaScript(`
        document.body.style.boxSizing='content-box';
        document.body.style.width = '100%';
        document.body.iframe.style.boxSizing='content-box';
      `)
      webview.addEventListener('did-navigate-in-page',(e)=>{
        console.log(e.url);
      })
    })
    backButton.addEventListener('click', () => {
      webview.goBack()
    })
    forwardButton.addEventListener('click', () => {
      webview.goForward()
    })
    reloadButton.addEventListener('click', () => {
      webview.reload()
    })
    newWindowButton.addEventListener('click', () => {
      if (window.api && window.api.newWindow) {
        window.api.newWindow()
      } else {
        console.error('API not available')
      }
    })
  })
}

/*function doAThing() {
  const versions = window.electron.process.versions
  replaceText('.electron-version', `Electron v${versions.electron}`)
  replaceText('.chrome-version', `Chromium v${versions.chrome}`)
  replaceText('.node-version', `Node v${versions.node}`)

  const ipcHandlerBtn = document.getElementById('ipcHandler')
  ipcHandlerBtn?.addEventListener('click', () => {
    window.electron.ipcRenderer.send('ping')
  })
}

function replaceText(selector, text) {
  const element = document.querySelector(selector)
  if (element) {
    element.innerText = text
  }
}
*/

init()
