import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Navbar from './components/navbar/Navbar'
import { Routes, Route} from 'react-router-dom';
import Education from './pages/Education'
import Tasks from './pages/Tasks'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ,
  
)
