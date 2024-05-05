import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
// import { store } from '@mui/icons-material'
// import Store from './State/Store'
// import {Store} from 
// import {store} from './State/store'
import {Store} from './State/Store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
  </>
)