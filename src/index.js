import React from 'react'
import ReactDOM from 'react-dom'

import './assets/css/fonts.css'
import './assets/css/index.css'

import App from './components/App/App'

import registerServiceWorker from './registerServiceWorker'
import customServiceWorker from './customServiceWorker'
import config from './config'

ReactDOM.render(<App config={ config } />, document.getElementById('root'))

customServiceWorker()
registerServiceWorker()