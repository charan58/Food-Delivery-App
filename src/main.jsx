import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginContextStore from './components/contexts/loginfunctions/LoginContextStore.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginContextStore>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LoginContextStore>
)
